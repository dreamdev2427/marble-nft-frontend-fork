import * as React from "react";
import { useState } from "react";
import { NftCategory } from "services/nft";
import { styled } from '@stitches/react'

interface NftCategoryProps {
  readonly categories: NftCategory[];
}

export function CategoryTab({ categories }: NftCategoryProps): JSX.Element {
  const [ activeTab, setActiveTab ] = useState(categories[0].id)
  const getActiveTabIfActive = (tabId) => (
    activeTab === tabId ? 'active' : ''
  )
  return (
    <>
      <CategoryDiv className="desktop-section category-menus">
      {categories.map((category, idx) => (
        (idx < 11) && (
        <span key={category.id} 
          onClick={() => setActiveTab(category.id)}
          className={`category-menu ${getActiveTabIfActive(category.id)}`}
        >
        {category.name}
        </span>
        )
      ))}
      </CategoryDiv>
      <CategoryDiv className="mobile-section category-menus">
      {categories.map((category, idx) => (
        (idx < 5) && (
        <span key={category.id} 
          onClick={() => setActiveTab(category.id)}
          className={`category-menu ${getActiveTabIfActive(category.id)}`}
        >
        {category.name}
        </span>
        )
      ))}
      </CategoryDiv>
    </>
  );
}

const CategoryDiv = styled('div', {
})