{ pkgs ? import <nixpkgs> { inherit system; }, system ? builtins.currentSystem
}@args:

(import ./override.nix args).shell.overrideAttrs (old: {
  buildInputs = old.buildInputs ++ (with pkgs; [ just ]);
  shellHook = ''
    ${old.shellHook}
    if [[ ! -e ]]
    then
      ln -s $nodeDependencies/lib/node_modules node_modules
    fi
  '';
})
