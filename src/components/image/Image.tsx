import { forwardRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// @mui
import { Box } from '@mui/material'
//
import { ImageProps } from './types'

// ----------------------------------------------------------------------

const Image = forwardRef<HTMLSpanElement, ImageProps>(({ ratio, disabledEffect = false, sx, ...other }, ref) => {
  const getRatio = (ratio = '1/1') => {
    return {
      '4/3': 'calc(100% / 4 * 3)',
      '3/4': 'calc(100% / 3 * 4)',
      '6/4': 'calc(100% / 6 * 4)',
      '4/6': 'calc(100% / 4 * 6)',
      '16/9': 'calc(100% / 16 * 9)',
      '9/16': 'calc(100% / 9 * 16)',
      '21/9': 'calc(100% / 21 * 9)',
      '9/21': 'calc(100% / 9 * 21)',
      '1/1': '100%',
    }[ratio]
  }

  const content = (
    <Box
      component={LazyLoadImage}
      wrapperClassName="wrapper"
      placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'}
      sx={{ width: 1, height: 1, objectFit: 'cover' }}
      {...other}
    />
  )

  if (ratio) {
    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          width: 1,
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        {content}
      </Box>
    )
  }

  return (
    <Box
      ref={ref}
      component="span"
      sx={{
        lineHeight: 1,
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
    >
      {content}
    </Box>
  )
})

export default Image