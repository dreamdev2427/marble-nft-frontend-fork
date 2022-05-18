import * as React from "react";
import { useState } from "react";
import { NftCategory } from "services/nft";
import { styled } from '@stitches/react'

interface NftCategoryProps {
  readonly categories: NftCategory[];
  readonly activeCategoryId: number;
}

export function CategoryTab({ categories, activeCategoryId, setActiveCategoryId }) {
  const getActiveTabIfActive = (tabId) => (
    activeCategoryId === tabId ? 'active' : ''
  )
  return (
    <>
      <CategoryDiv className="desktop-section category-menus">
      {categories.length > 0 && categories.map((category, idx) => (
        (idx < 11) && (
        <span key={category.id} 
          onClick={() => setActiveCategoryId(category.id)}
          className={`category-menu ${getActiveTabIfActive(category.id)}`}
        >
        {category.name}
        </span>
        )
      ))}
      </CategoryDiv>
      <CategoryDiv className="mobile-section category-menus">
      {categories.length > 0 && categories.map((category, idx) => (
        (idx < 5) && (
        <span key={category.id} 
          onClick={() => setActiveCategoryId(category.id)}
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