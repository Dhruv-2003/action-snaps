# @metamask/template-snap-monorepo

MetaMask Snaps is a system that allows anyone to safely expand the capabilities
of MetaMask. A _snap_ is a program that we run in an isolated environment that
can customize the wallet experience.

## Snaps is pre-release software

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/),
a canary distribution for developers that provides access to upcoming features.

NOTE: Disable main metmask to be able to interact with the Metamask flask version

## Getting Started

Clone this repostiory
and set up the development environment:

```shell
yarn install && yarn start
```

This will start the server at `http://localhost:8000/` , from where you can connect the metamask flask directly and it will ask for permissions to install the snap.

After this step , you are free to interact with any MRU out there which asks for `eth_signTypedData_v3` or `eth_signTypedData_v4` signature and store it in the local unencrypted storage.

Later , they can be seen from the Home page of the snap by going to the `Snaps` section of the Metamask flask and selecting the respective snap which should be named `Stackr Action History` for now. This would display the information of all the actions that took place from the latest to the oldest.
