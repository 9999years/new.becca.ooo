{ pkgs ? import <nixpkgs> { }, }:

let
  inherit (pkgs) stdenv lib fetchurl;
  binWrapperPatches = [ ];

  # some npm packages attempt to run a binary from github and fall back on
  # building from source. However, sources are kept in an archive, so the
  # regular shebang patching doesn't work and the build fails.
  # This function gives shell commands to extract, patch, and recompress an
  # archive for later use.
  patchArchiveShebangs = { archive, directory }: ''
    if [[ ! -e "${archive}" ]]
    then
      echo "Couldn't find ${archive} to patch script shebangs."
      exit 1
    fi
    tar -xf ${archive}
    patchShebangs ${directory}
    rm ${archive}
    tar -czf ${archive} ${directory}
    rm -rf ${directory}
  '';

  fixNodeModules = ''
    npm install --ignore-scripts

    for patch in $patches
    do
      patch -p1 < $patch
    done

    patchShebangs node_modules

    # Fix install URLs to not use the network
    ${toString (map (pkg:
      let bin = if ({ isBin = true; } // pkg).isBin then "-bin" else "";
      in ''
        substituteInPlace node_modules/${pkg.name}${bin}/lib/install.js \
          --replace "url('${pkg.url}'" "file('${pkg.src}'"
      '') binWrapperPatches)}
  '';

in stdenv.mkDerivation rec {
  name = "becca.ooo";
  version = "1.0.0";

  src = ./.;

  patches = [
    # ./nix-support/bin-build.patch
  ];
  patchPhase = "true"; # we patch manually, later

  buildInputs = with pkgs;
    [
      just
      nix # for nix-hash
      nodejs-12_x
      nodePackages.npm
      # For gifsicle, etc.
      autoconf
      automake
    ] ++ (builtins.concatMap (p: ({ buildInputs = [ ]; } // p).buildInputs)
      binWrapperPatches);

  dontConfigure = true;

  # for optipng
  LD = toString stdenv.cc;

  buildPhase = ''
    echo "extracting node_modules"
    tar -xf "node_modules_$(nix-hash --base32 package-lock.json).tar.gz"
    echo "done"
    export HOME="$PWD"
    ${fixNodeModules}
  '';

  installPhase = ''
    just build
    cp -r public $out
  '';

  shellHook = ''
    ${fixNodeModules}
  '';
}

