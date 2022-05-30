import React from "react"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { Button } from 'components/Button'
import { styled } from 'components/theme'
import { IconWrapper } from 'components/IconWrapper'
import { ArrowLeft, CollapseDown, Sidebar } from 'icons'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux"
import { State } from 'store/reducers'

import { setUIData } from "store/actions/uiAction"
import { setFilterData } from "store/actions/filterAction"
import { 
  NFT_COLUMN_COUNT, 
  UI_ERROR, 
  FILTER_STATUS,
  FILTER_STATUS_BUY_NOW,
  FILTER_STATUS_ON_AUCTION,
  FILTER_STATUS_NEW,
  FILTER_STATUS_HAS_OFFERS,
  FILTER_STATUS_TXT,
  FILTER_ACCESSORIES,
  FILTER_BACKGROUND,
  FILTER_CLOTHES,
  FILTER_EXPRESSIONS,
  FILTER_EYES,
  FILTER_HELMET,
  FILTER_EARRING
} from "store/types"
import { Dispatch, AnyAction } from "redux"

export const CollectionFilter = ({ isCollapse, setCollapse}) => {
  const dispatch = useDispatch()
  
  const uiListData = useSelector((state: State) => state.uiData)
  const { nft_column_count } = uiListData

  const filterData = useSelector((state: State) => state.filterData)
  const { filter_status } = filterData
  useEffect(() => {
    if (isCollapse){
      if (nft_column_count >= 5)
        return
      //setUIData(NFT_COLUMN_COUNT, nft_column_count + 1)
      dispatch(
        {
          type: NFT_COLUMN_COUNT,
          payload: nft_column_count + 1
        }
      )
    }else{
      if (nft_column_count <= 3)
        return
      //setUIData(NFT_COLUMN_COUNT, nft_column_count -1)
      dispatch(
        {
          type: NFT_COLUMN_COUNT,
          payload: nft_column_count - 1
        }
      )
    }
  }, [dispatch, isCollapse])
  
  return (
    <FilterWrapper className={`filter-wrapper ${isCollapse?'collapse':''}`}>
      <header>
        <Button className="filter-header"
          as="a"
          variant="ghost"
          iconRight={!isCollapse && <IconWrapper icon={<ArrowLeft />}/> || isCollapse && <IconWrapper icon={<Sidebar />}/> }
          onClick={() => {
            setCollapse(!isCollapse)
            return false
          }}
        >
          {!isCollapse &&
            'Quick Filters'
          }
        </Button>
      </header>
      <Accordion defaultIndex={[]} allowMultiple className={`${isCollapse?'hide':''}`}>
        <AccordionItem className='hide'>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Status
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              <Button 
                variant={`${filter_status.indexOf(FILTER_STATUS_BUY_NOW) != -1?'primary':'secondary'}`}
                onClick={() => {
                  if (filter_status.indexOf(FILTER_STATUS_BUY_NOW) == -1){
                    filter_status.push(FILTER_STATUS_BUY_NOW)
                  }else{
                    filter_status.splice(filter_status.indexOf(FILTER_STATUS_BUY_NOW), 1)
                  }
                  //setFilterData(FILTER_STATUS, filter_status)
                  dispatch(
                    {
                      type: FILTER_STATUS,
                      payload: filter_status,
                    }
                  )
                  return false
                }}
              >
                {FILTER_STATUS_TXT[FILTER_STATUS_BUY_NOW]}
              </Button>
              <Button
                variant={`${filter_status.indexOf(FILTER_STATUS_ON_AUCTION) != -1?'primary':'secondary'}`}
                onClick={() => {
                  if (filter_status.indexOf(FILTER_STATUS_ON_AUCTION) == -1){
                    filter_status.push(FILTER_STATUS_ON_AUCTION)
                  }else{
                    filter_status.splice(filter_status.indexOf(FILTER_STATUS_ON_AUCTION), 1)
                  }
                  //setFilterData(FILTER_STATUS, filter_status)
                  dispatch(
                    {
                      type: FILTER_STATUS,
                      payload: filter_status,
                    }
                  )
                  return false
                }}
              >
                {FILTER_STATUS_TXT[FILTER_STATUS_ON_AUCTION]}
              </Button>
              <Button
                variant={`${filter_status.indexOf(FILTER_STATUS_NEW) != -1?'primary':'secondary'}`}
                onClick={() => {
                  if (filter_status.indexOf(FILTER_STATUS_NEW) == -1){
                    filter_status.push(FILTER_STATUS_NEW)
                  }else{
                    filter_status.splice(filter_status.indexOf(FILTER_STATUS_NEW), 1)
                  }
                  //setFilterData(FILTER_STATUS, filter_status)
                  dispatch(
                    {
                      type: FILTER_STATUS,
                      payload: filter_status,
                    }
                  )
                  return false
                }}
              >
                {FILTER_STATUS_TXT[FILTER_STATUS_NEW]}
              </Button>
              <Button
                variant={`${filter_status.indexOf(FILTER_STATUS_HAS_OFFERS) != -1?'primary':'secondary'}`}
                onClick={() => {
                  if (filter_status.indexOf(FILTER_STATUS_HAS_OFFERS) == -1){
                    filter_status.push(FILTER_STATUS_HAS_OFFERS)
                  }else{
                    filter_status.splice(filter_status.indexOf(FILTER_STATUS_HAS_OFFERS), 1)
                  }
                  //setFilterData(FILTER_STATUS, filter_status)
                  dispatch(
                    {
                      type: FILTER_STATUS,
                      payload: filter_status,
                    }
                  )
                  return false
                }}
              >
                {FILTER_STATUS_TXT[FILTER_STATUS_HAS_OFFERS]}
              </Button>
            </Conditions>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Accessories
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_ACCESSORIES.map((item, index) => (
                <Button
                  key={`accessories${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //dispatch(setFilterData(FILTER_STATUS, filter_status))
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Background
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_BACKGROUND.map((item, index) => (
                <Button
                  key={`background${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //setFilterData(FILTER_STATUS, filter_status)
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Clothes
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_CLOTHES.map((item, index) => (
                <Button
                  key={`clothes${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //setFilterData(FILTER_STATUS, filter_status)
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Earring
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_EARRING.map((item, index) => (
                <Button
                  key={`earring${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //setFilterData(FILTER_STATUS, filter_status)
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Expressions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_EXPRESSIONS.map((item, index) => (
                <Button
                  key={`expressions${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //setFilterData(FILTER_STATUS, filter_status)
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Eyes
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_EYES.map((item, index) => (
                <Button
                  key={`eyes${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //setFilterData(FILTER_STATUS, filter_status)
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h4 className="filter-item">
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Helmet
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            <Conditions className="grid">
              {FILTER_HELMET.map((item, index) => (
                <Button
                  key={`helmet${index}`}
                  variant="secondary"
                  className={`${filter_status.indexOf(item.id) != -1?'active':'default'}`}
                  onClick={() => {
                    if (filter_status.indexOf(item.id) == -1){
                      filter_status.push(item.id)
                    }else{
                      filter_status.splice(filter_status.indexOf(item.id), 1)
                    }
                    //setFilterData(FILTER_STATUS, filter_status)
                    dispatch(
                      {
                        type: FILTER_STATUS,
                        payload: filter_status,
                      }
                    )
                    return false
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Conditions>
          </AccordionPanel>
        </AccordionItem>

        

      </Accordion>
    </FilterWrapper>
  )
}

const FilterWrapper = styled('div', {
  width: '$25',
  
  ' .filter-header':{
    borderLeft: '$borderWidths$1 solid $borderColors$default',
    borderRight: '$borderWidths$1 solid $borderColors$default',
    borderBottom: '$borderWidths$1 solid $borderColors$default',
  },
  '&.collapse': {
    width: '$10',
    borderRight: '$borderWidths$1 solid $borderColors$default',
    ' .filter-header':{
      paddingLeft: '$10',
      border: '0px',
    },
  },
  ' .filter-item':{
    height: '$lineHeights$5',
    paddingRight: '$16',
    borderRadius: '0px',
    margin: '0px',
    lineHeight: '$lineHeights$5',
    paddingLeft: '16px',
    color: '$textColors$primary',
    borderLeft: '$borderWidths$1 solid $borderColors$default',
    borderRight: '$borderWidths$1 solid $borderColors$default',
    borderBottom: '$borderWidths$1 solid $borderColors$default',
    ' svg': {
      width: '$7',
      height: '$7',
    }
  },
  '.chakra-collapse':{
    borderLeft: '$borderWidths$1 solid $borderColors$default',
    borderRight: '$borderWidths$1 solid $borderColors$default',
    borderBottom: '$borderWidths$1 solid $borderColors$default',
  }
})

const Conditions = styled('div', {
  '&.grid':{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '$2',
    padding: '$8',
    ' button':{
      border:'$borderWidths$1 solid $borderColors$default',
      borderRadius: '$2',
      fontSize: '12px',
      padding: '$sizes$4 0px',
    },
    ' .default':{
      color: '$textColors$tertiary',
      background: 'transparent',
      fontWeight: 'normal',
    },
    ' .active':{
      background: '$backgroundColors$tertiary',
      fontWeight: 'bold',
    }
  }
})



