import { Box } from '@material-ui/core'
import React, { useEffect } from 'react'

const Page = ({ title, showFooter = true, children }) => {
  useEffect(() => {
    document.title = 'rytt' + (title ? ` | ${title}` : '')
  }, [])

  return (
    <Box display="flex" flexDirection="column" height="calc(100vh - 64px)">
      {children}
      {/* {showFooter && <Footer />} */}
    </Box>
  )
}

export default Page
