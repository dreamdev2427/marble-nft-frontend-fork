import React from "react"
import { useState } from "react";
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

export const CollectionFilter = ({ isCollapse ,setCollapse }) => {

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
              <Button>
                Buy Now
              </Button>
              <Button>
                On Auction
              </Button>
              <Button>
                New
              </Button>
              <Button>
                Has Offers
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



