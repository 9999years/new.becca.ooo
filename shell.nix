{ pkgs ? import <nixpkgs> { inherit system; }, system ? builtins.currentSystem
}@args:

(import ./override.nix args).shell.overrideAttrs
(old: { buildInputs = old.buildInputs ++ (with pkgs; [ just ]); })
