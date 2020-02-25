{ pkgs ? import <nixpkgs> { inherit system; }, system ? builtins.currentSystem
}:

let
  inherit (pkgs) fetchurl stdenv;
  nodePackages = import ./default.nix { inherit pkgs system; };

  binWrapperPatches = [
    rec {
      name = "optipng";
      version = "0.7.7";
      url =
        "https://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-${version}/optipng-${version}.tar.gz";
      src = fetchurl {
        inherit url;
        sha512 =
          "20040r1v21kd3gicglm18agazp2sa604kkbrlr6si2lh5l8ycghiykaz4x53ysv8w07rzjv9h13fg1721zf0rn0s929kcrs2i87cfy3";
      };
    }

    rec {
      name = "jpegtran";
      version = "1.5.1";
      url =
        "https://downloads.sourceforge.net/project/libjpeg-turbo/${version}/libjpeg-turbo-${version}.tar.gz";
      src = fetchurl {
        inherit url;
        sha512 =
          "194hlrnf4gxmp9n91s95r7nrgc6vxdm9iyxflcl52155f7hpkis2bcwa1wrqfq10vfgspz505n6a7wvjw5flbsh9sias6ix9g7j6f50";
      };
    }

    rec {
      name = "mozjpeg";
      version = "3.2";
      isBin = false;
      url =
        "https://github.com/mozilla/mozjpeg/releases/download/v${version}/mozjpeg-${version}-release-source.tar.gz";
      src = stdenv.mkDerivation rec {
        inherit name version;
        src = fetchurl {
          inherit url;
          sha512 =
            "2fcif4ys19mpy9hqgbi15rdnq0xp9s5b64mhsgnyp3zskzd4n3zvnbzkmbw928gbdacavc01w5ndync3k6v2yrji2xbpxjr9x4sg3vg";
        };
        sourceRoot = ".";

        dontConfigure = true;
        buildPhase = ''
          substituteInPlace mozjpeg/configure \
            --replace /usr/bin/file ${pkgs.file}/bin/file
          tar -cf $out mozjpeg
        '';
        dontInstall = true;
      };
    }
  ];

  # some npm packages attempt to run a binary from github and fall back on
  # building from source. However, sources are kept in an archive, so the
  # regular shebang patching doesn't work and the build fails.
  # This function gives shell commands to extract, patch, and recompress an
  # archive for later use.
  patchArchiveShebangs = { archive, directory }: ''
    tar -xf ${archive}
    patchShebangs ${directory}
    rm ${archive}
    tar -czf ${archive} ${directory}
    rm -rf ${directory}
  '';

  overrideArgs = {
    buildInputs = with pkgs; [
      # For gifsicle, etc.
      autoconf
      automake
      # for optipng
      libpng
      zlib
      # for jpegtran???
      nasm
      # for mozjpeg
      gettext
      libtool
      pkgconfig
    ];

    patches = [ ./nix-support/bin-build.patch ];
    patchPhase = "true"; # we patch manually, later

    LD = toString stdenv.cc;

    preRebuild = ''
      ${patchArchiveShebangs {
        archive = "node_modules/pngquant-bin/vendor/source/pngquant.tar.gz";
        directory = "pngquant";
      }}

      for patch in $patches
      do
        patch -p1 < $patch
      done

      # Fix install URLs to not use the network
      ${toString (map (pkg:
        let bin = if ({ isBin = true; } // pkg).isBin then "-bin" else "";
        in ''
          substituteInPlace node_modules/${pkg.name}${bin}/lib/install.js \
            --replace "url('${pkg.url}'" "file('${pkg.src}'"
        '') binWrapperPatches)}

      # optipng needs an extra ./configure flag
      # https://github.com/imagemin/optipng-bin/issues/108
      substituteInPlace node_modules/optipng-bin/lib/install.js \
          --replace "\`./configure" "\`LD=\\$CC ./configure --with-system-libpng"
    '';
  };

in nodePackages // {
  package = nodePackages.package.override overrideArgs;
  shell = nodePackages.shell.override overrideArgs;
}
