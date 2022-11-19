import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers'
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link'




export default function Index({AllData, HealthData, EducationData,AnimalData}) {

  const [filter, setFilter] = useState(AllData);
  

  return (
    <HomeWrapper>
      <Head>
        <HeadTitle>Lets Use <Span>Blockchain</Span> Technology To help Others</HeadTitle>
        <P>Presenting FundChain, the ultimate crowdfunding platform based on polygon blockchain</P>
        
      </Head>
      {/*Filter Secction*/}
      <FilterWrapper>
        <FilterAltIcon style={{ fontSize: 40 }} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
      </FilterWrapper>
      {/*Card Container */}

      <CardsWrapper>

        {/* Card */}
        {filter.map((e) => {
          return (
            <Card key={e.title}>
              
              <CardImg>
                <Image
                style={{borderRadius:"20px 20px 0px 0px"}}
                  alt="Crowdfunding dapp"
                  layout='fill'
                  src={"https://crowdfunding.infura-ipfs.io/ipfs/" + e.image}
                />
              </CardImg>
              <Title>
                {e.title}
              </Title>
              <CardData>
                <Text>Owner<AccountBoxIcon /></Text>
                <Text>{e.owner.slice(0, 6)}...{e.owner.slice(39)}</Text>
              </CardData>
              <CardData>
                <Text>Amount<PaidIcon /></Text>
                <Text>{e.amount} Matic</Text>
              </CardData>
              <CardData>
                <Text><EventIcon /></Text>
                <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
              </CardData>
              <Link passHref href={'/' + e.address}><Button>
                Go to Campaign
              </Button></Link>
              
            </Card>
          )
        })}


      </CardsWrapper>
    </HomeWrapper>

  )
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData
    },
    revalidate: 10
  }
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 300px;
`
const Head=styled.div`
height: 55vh;
align-items: center;


`
const P=styled.p`

margin-top: 0px;
font-size: 21px;
font-family: "Poppins";
text-align: center;

`
const HeadTitle=styled.h1`
font-size: 4rem;
padding-left: 20%;
padding-right: 20%;
text-align: center;
margin-top: 13vh;
`
const Span=styled.span`
background: ${(props) => props.theme.buttonGradient};
-webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  border-radius: 20px;
  
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`

const CardImg = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 20px;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 22px;
  text-align: center;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px;
  padding: 10px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-image:${(props)=>props.theme.buttonGradient};
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;

`
