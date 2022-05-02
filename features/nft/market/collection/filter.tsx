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
  FILTER_STATUS_TXT
} from "store/types"

export const CollectionFilter = ({ isCollapse ,setCollapse }) => {
  const dispatch = useDispatch()
  
  const uiListData = useSelector((state) => state.uiData)
  const { nft_column_count } = uiListData

  const filterData = useSelector((state) => state.filterData)
  const { filter_status } = filterData
  useEffect(() => {
    if (isCollapse){
      if (nft_column_count >= 5)
        return
      dispatch(setUIData(NFT_COLUMN_COUNT, nft_column_count + 1))
    }else{
      if (nft_column_count <= 3)
        return
      dispatch(setUIData(NFT_COLUMN_COUNT, nft_column_count -1))
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
            'QuickFilters'
          }
        </Button>
      </header>
      <Accordion defaultIndex={[]} allowMultiple className={`${isCollapse?'hide':''}`}>
        <AccordionItem>
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
                  dispatch(setFilterData(FILTER_STATUS, filter_status))
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
                  dispatch(setFilterData(FILTER_STATUS, filter_status))
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
                  dispatch(setFilterData(FILTER_STATUS, filter_status))
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
                  dispatch(setFilterData(FILTER_STATUS, filter_status))
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
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h4>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
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
    gridTemplateColumns: '1fr 1fr',
    gridGap: '$2',
    padding: '$8',
    
  }
})



