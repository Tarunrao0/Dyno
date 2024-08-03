# What is Dyno ?

Dyno is a blockchain protocol designed to manage the energy grid by facilitating ERC-20 token trades between buyers and sellers. It promotes true decentralization by empowering users to select their own electricity suppliers. Additionally, local electricity suppliers can participate by registering on the platform.

## Dyno's work flow 
To participate in our protocol, users first need to acquire DYNO tokens. Users can visit the Marketplace tab to purchase DYNO tokens using USDC, with an exchange rate of 1:1.

Sellers need to complete a registration form available under the Register tab. This information will be sent to the admin's dashboard for approval. Upon approval, sellers will be granted the seller role and listed on the homepage, where buyers can view their profiles.

Buyers who have acquired DYNO tokens can browse the available sellers and select one of their choice. They can then specify the amount of energy they wish to purchase, with a rate of 1 DYNO per 100 kWh. After confirming the amount, the corresponding DYNO tokens are transferred to the seller.

Sellers can later visit the Marketplace to exchange their DYNO tokens for an equivalent amount of USDC.



## Quick look at the backend

The smart contracts for this protocol are written in Solidity and utilize a Hardhat-Foundry setup. These contracts have undergone extensive testing using Foundry to ensure their reliability and performance. They are currently deployed on the Sepolia testnet.


### Usage

#### Build

```shell
$ forge build
```

#### Test

```shell
$ forge test
```

#### Coverage

```shell
$ forge coverage
```


#### Deploy

```shell
$ npx hardhat run script/deploy.js --network sepolia
```

### Frontend

The front end is built using Wagmi, NextJS and TailwindCss. It also has a better-sqlite3 database to store all the seller data that was verified. 

🎥 Video demonstration : [Dyno-Demo](https://www.youtube.com/watch?v=gLBqs8geOvQ)

#### Home + the seller listing

![Screenshot 2024-08-03 172121](https://github.com/user-attachments/assets/fb16071d-799e-4233-90ae-83b4a8240137)
![image](https://github.com/user-attachments/assets/774677a5-6b1b-4f87-a203-00dcf086ab6b)

#### Marketplace

![image](https://github.com/user-attachments/assets/86560250-0fd9-40d3-a501-b150e1d62bf2)

#### Seller Page

![image](https://github.com/user-attachments/assets/42076bb4-6881-4515-a7b6-0fda9a260562)

#### Register Page

![image](https://github.com/user-attachments/assets/5504bff4-b14c-4fd1-b83b-b0655a95700f)
![image](https://github.com/user-attachments/assets/82b8da05-fc33-4586-aa49-da94789c61c8)

#### Admin Dashboard

![image](https://github.com/user-attachments/assets/2aed46f5-e85e-4207-8ce2-7fda7c85c71d)

