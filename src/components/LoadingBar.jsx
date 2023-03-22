import React from 'react'
import Loader from './LinearProgressLoader'
import PaddedProgressBar from './PaddedProgressBar'

const LoadingBar = ({ dataArray, text = '' }) =>
  dataArray ? <Loader /> : <PaddedProgressBar text={text} />

export default LoadingBar
