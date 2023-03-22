import { Card } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: '10px',
    fontSize: '12px',
    color: 'gray'
  },
  card: {
    padding: '8px'
  }
}))

function AlertHelpVideo() {
  const classes = useStyles()

  const [url, setUrl] = React.useState(null)
  const videoMap = [
    {
      label: 'English',
      url: 'https://www.youtube.com/embed/peg3vTiWAj8'
    },
    {
      label: 'Hindi',
      url: 'https://www.youtube.com/embed/8Qn_spdM5Zg'
    }
  ]

  const handleClickOpen = (url) => {
    setUrl(url)
  }

  const handleClose = () => {
    setUrl(null)
  }

  return (
    <>
      <Card className={classes.card}>
        <Typography variant="body1" gutterBottom style={{ fontWeight: 700 }}>
          Need Help ?
        </Typography>
        <Typography variant="subtitle2">
          Check out these videos to learn more
        </Typography>

        {videoMap.map(({ label, url }) => {
          return (
            <Button
              key={url}
              startIcon={<PlayCircleOutlineIcon />}
              className={classes.btn}
              onClick={() => handleClickOpen(url)}>
              {label}
            </Button>
          )
        })}

        <Dialog
          open={Boolean(url)}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <iframe
            width="560"
            height="315"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </Dialog>
      </Card>
    </>
  )
}

export default AlertHelpVideo
