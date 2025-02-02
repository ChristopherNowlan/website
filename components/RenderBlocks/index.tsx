'use client'

import React, { Fragment } from 'react'
import { Page, ReusableContent } from '../../payload-types'
import { toKebabCase } from '../../utilities/to-kebab-case'
import { BlockSpacing } from '../BlockSpacing'
import { BannerBlock } from '../blocks/Banner'
import { BlogContent } from '../blocks/BlogContent'
import { MediaBlock } from '../blocks/MediaBlock'
import { CodeBlock } from '../blocks/CodeBlock'
import { HeaderObserver } from '../HeaderObserver'
import { useTheme } from '../providers/Theme'
import { ContentBlock } from '../blocks/Content'

type ReusableContentBlock = Extract<Page['layout'][0], { blockType: 'reusableContentBlock' }>

const blockComponents = {
  banner: BannerBlock,
  blogContent: BlogContent,
  mediaBlock: MediaBlock,
  code: CodeBlock,
  content: ContentBlock,
}

export const RenderBlocks: React.FC<{
  blocks: (ReusableContent['layout'][0] | ReusableContentBlock)[]
}> = props => {
  const { blocks } = props
  const theme = useTheme()

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <HeaderObserver color={theme}>
        <Fragment>
          {blocks.map((block, index) => {
            const { blockName, blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              if (Block) {
                return (
                  <BlockSpacing key={index}>
                    <Block id={toKebabCase(blockName)} {...block} />
                  </BlockSpacing>
                )
              }
            }
            return null
          })}
        </Fragment>
      </HeaderObserver>
    )
  }

  return null
}
