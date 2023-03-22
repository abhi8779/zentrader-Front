import logo from '@/assets/images/ap-logo-black.png'
import LoadingButton from '@/components/LoadingButton'
import config from '@/config'
import ZenApi from '@/services/trader'
import theme from '@/theme'
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import React, { useState } from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import useRazorpay from 'react-razorpay'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const { useGlobalState } = createGlobalState({
  paymentConfig: {
    discount: null,
    open: false,
    data: null,
    onSuccess: null,
    onClose: null
  }
})

const useStyles = makeStyles((theme) => ({
  discountWrap: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const OrderPreviewDialog = () => {
  const classes = useStyles()
  const [isLoading, setIsloading] = useState()
  const Razorpay = useRazorpay()
  const user = useSelector((s) => s.user.user)

  const [
    { open, data, discount, onSuccess, onClose },
    setConf
  ] = useGlobalState('paymentConfig')
  const makePayment = async (params) => {
    try {
      const bpIds = data.order_items.map((item) => item.billing_plan.id)
      const res = await ZenApi.Subscription.Order.create(bpIds, discount?.id)
      if (res.data.payment_required && res.data.razorpay_id) {
        initRazorPayPayment(res.data.razorpay_id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const initRazorPayPayment = (razorPayOrderId) => {
    const rzp1 = new Razorpay({
      key: config.RAZORPAY_KEY,
      order_id: razorPayOrderId,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },
      amount: data.final_amount * 100,
      currency: 'INR',
      name: 'Asmita Patel',
      description: 'Subscription Charges',
      image: logo,
      handler: async function(response) {
        setIsloading(true)
        await ZenApi.Subscription.Order.validate(razorPayOrderId)
        setIsloading(false)
        toast.success(`Payment Complete`)
        onSuccess && onSuccess()
        setConf({
          open: false,
          data: null,
          onSuccess: null
        })
      }
    })

    rzp1.on('payment.failed', function(response) {
      toast.error('Payment failed')
    })

    rzp1.open()
  }
  return (
    <>
      {open && (
        <Dialog
          open={true}
          maxWidth="xs"
          disableEnforceFocus={true}
          onClose={() => {
            onClose && onClose()
            setConf({
              open: false,
              data: null,
              onSuccess: null
            })
          }}>
          <DialogContent>
            <Grid container>
              {data.order_items.map((item) => (
                <OrderItem item={item} key={item.billing_plan.id} />
              ))}

              <Grid item xs={12}>
                <Box my={2}>
                  <Divider />
                </Box>
              </Grid>

              <Grid item xs={8}>
                <Typography variant="body1">Total</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Typography variant="body1">₹ {data.items_total}</Typography>
              </Grid>

              {discount && (
                <Grid item xs={12} container className={classes.discountWrap}>
                  <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontWeight: 700 }}>
                      {discount?.title} ({discount?.percentage}%)
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography variant="body1" style={{ color: green[500] }}>
                      - ₹ {data.discount_amount}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      Total after discount
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography variant="body1">₹ {data.pre_tax}</Typography>
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box my={2}>
                  <Divider />
                </Box>
              </Grid>

              <Grid item xs={8}>
                <Typography variant="body1">Tax (18% GST)</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Typography variant="body1">₹ {data.tax_amount}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Box my={2}>
                  <Divider />
                </Box>
              </Grid>

              <Grid item xs={8}>
                <Typography variant="h6" style={{ fontWeight: 700 }}>
                  Final Amount
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Typography style={{ color: green[500] }} variant="h6">
                  <strong>₹ {data.final_amount}</strong>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <Box p={2}>
            <LoadingButton
              variant="contained"
              size="large"
              fullWidth
              loadingText={'Validating Paymnet...'}
              isLoading={isLoading}
              onClick={makePayment}
              color="primary">
              Make Payment
            </LoadingButton>
          </Box>
        </Dialog>
      )}
    </>
  )
}

const OrderItem = ({ item }) => {
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
      {item.deduction ? (
        <>
          <Grid item xs={6}>
            <Box display="flex" alignItems="baseline">
              <Typography variant="h6">
                {item.billing_plan.plan.name}
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {item.billing_plan.interval_months}
                {` Month${item.billing_plan.interval_months > 1 ? 's' : ''}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Box
              // style={{ background: 'red' }}
              display="flex"
              // alignItems="center"
              flexDirection={smallScreen ? 'column' : 'row'}
              justifyContent="flex-end">
              <Typography
                variant="body1"
                style={{ color: grey[700], marginLeft: 8 }}>
                ₹ {item.price} -
              </Typography>
              <Tooltip title="Amount adjusted from previous subscription">
                <Typography
                  variant="body1"
                  style={{ color: grey[700], marginLeft: 8 }}>
                  ₹ {item.deduction}
                  {'* '}
                </Typography>
              </Tooltip>
              <Typography variant="body1" style={{ marginLeft: 8 }}>
                {' '}
                ₹ {item.final_amount}
              </Typography>
            </Box>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={8}>
            <Typography variant="body1">
              {item.billing_plan.plan.name}
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <Typography variant="body1">₹ {item.final_amount}</Typography>
          </Grid>
        </>
      )}
    </>
  )
}

const usePaymentDialog = () => {
  const [, setConf] = useGlobalState('paymentConfig')
  const showPaymentDialog = ({ data, onSuccess, onClose, discount }) => {
    setConf({
      discount,
      open: true,
      data,
      onSuccess,
      onClose
    })
  }
  return showPaymentDialog
}

export default OrderPreviewDialog
export { usePaymentDialog }
