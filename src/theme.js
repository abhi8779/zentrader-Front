import { lighten } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'
import BRANDING from './config'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Lato',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),
    fontSize: 13
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 8
      }
    },
    MuiTabs: {
      flexContainer: {
        borderBottom: '1px solid #f3f3f3'
      }
    },
    MuiTab: {
      root: {
        '@media (min-width:600px)': {
          minWidth: 72
        }
      }
    },
    MuiTableHead: {
      root: {
        borderBottom: '#f3f3f3 1px solid',
        position: 'sticky',
        top: 0,

        // backgroundColor: grey[100],
        zIndex: 2,
        paddingTop: 8,
        paddingBottom: 8,
        textTransform: 'uppercase'
      }
    },
    MuiTablePagination: {
      root: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 2,
        paddingTop: 8,
        paddingBottom: 8
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: 'transparent 0px solid'
      },
      head: {
        lineHeight: 1,
        fontWeight: 700,
        color: grey[500],
        padding: `8px 16px`
      }
    },
    MuiButtonGroup: {
      grouped: {
        flexGrow: 1
      }
    },
    MuiToggleButton: {
      sizeSmall: {
        padding: 8
      },
      root: {
        fontWeight: 700,
        '&.Mui-selected:hover': {
          backgroundColor: BRANDING.BRANDING === 'rytt' ? '#2180d0' : '#3fa53f',
          color: 'white'
        },
        '&.Mui-selected': {
          backgroundColor: BRANDING.BRANDING === 'rytt' ? '#2180d0' : '#3fa53f',
          color: 'white'
        },
        '&:hover': {
          backgroundColor:
            BRANDING.BRANDING === 'rytt'
              ? lighten('#abd9ff', 0.5)
              : lighten('#3fa53f', 0.5),
          color: 'white'
        }
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 28
      }
    },

    MuiDialogTitle: {
      root: {
        backgroundColor: grey[100],
        '& .MuiTypography-root': {
          fontWeight: 700
        }
      }
    }
  },
  palette: {
    primary: {
      main: BRANDING.BRANDING === 'rytt' ? '#410b76' : '#3fa53f'
    },
    secondary: {
      main: BRANDING.BRANDING === 'rytt' ? '#410b76' : '#3fa53f'
    },
    danger: {
      main: BRANDING.BRANDING === 'rytt' ? '#410b76' : '#f93e50'
    }
  }
})

export default theme
