import api from '@/services/api'
import FileDownload from 'js-file-download'

const get = async (url, params) => {
  return api.get(url, {
    params
  })
}

const ZenApi = {
  OptionSell: {
    StrikeMeasure: {
      get: (params) => {
        return get('/api/optionsell/strike/', params)
      },
      createBulkOrders: (data) => {
        return api.post('/api/optionsell/strike/create_bulk_orders/', data)
      }
    },
    Order: {
      get: (params) => {
        return get('/api/optionsell/order/', params)
      },
      delete: (id) => {
        return api.delete(`/api/optionsell/order/${id}/`)
      },
      trigger: (id) => {
        return api.post(`/api/optionsell/order/${id}/trigger/`)
      },
      exportCsv: async () => {
        return api
          .get('/api/optionsell/order/export_to_csv/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, 'new-orders.csv')
          })
      }
    },
    Position: {
      get: (params) => {
        return get('/api/optionsell/position/', params)
      },
      delete: (id) => {
        return api.delete(`/api/optionsell/position/${id}/`)
      },
      exportTargetsCsv: async () => {
        return api
          .get('/api/optionsell/position/export_targets_to_csv/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, 'position-targets.csv')
          })
      },
      exportSlsCsv: async () => {
        return api
          .get('/api/optionsell/position/export_sl_to_csv/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, 'position-sls.csv')
          })
      }
    }
  },
  Order: {
    Order: {
      get: (params) => {
        return get('/api/order/order/', params)
      },
      delete: (id) => {
        return api.delete(`/api/order/order/${id}/`)
      },
      exportCsv: async () => {
        return api
          .get('/api/order/order/export_to_csv/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, 'new-orders.csv')
          })
      }
    }
  },
  Position: {
    Position: {
      get: (params) => {
        return get('/api/position/position/', params)
      },
      delete: (id) => {
        return api.delete(`/api/position/position/${id}/`)
      },
      importCsv: async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return api.post('/api/position/position/import_from_csv/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },
      exportTargetsCsv: async () => {
        return api
          .get('/api/position/position/export_targets/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, 'position-targets.csv')
          })
      },
      exportSlsCsv: async () => {
        return api
          .get('/api/position/position/export_sls/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, 'position-sls.csv')
          })
      }
    }
  },
  MarketData: {
    Strike: {
      get: (params) => {
        return api.get('/api/marketdata/strike/', {
          params
        })
      }
    },
    Instrument: {
      get: async (params) => {
        return api.get('/api/marketdata/instrument/', {
          params
        })
      },
      getDetails: async (id) => {
        return api.get('/api/marketdata/instrument/' + id + '/details/')
      },
      getExpiries: async (id, type) => {
        return api.get('/api/marketdata/instrument/' + id + '/expiries/', {
          params: {
            type
          }
        })
      },
      getOptions: async (id, type, expiry) => {
        return api.get('/api/marketdata/instrument/' + id + '/options/', {
          params: {
            type,
            expiry
          }
        })
      },
      getFutures: async (id) => {
        return api.get('/api/marketdata/instrument/' + id + '/futures/')
      }
    },
    InstrumentTrend: {
      get: async (params) => {
        return api.get('/api/marketdata/instrument_trend/', {
          params
        })
      },
      getDetails: async (id) => {
        return api.get('/api/marketdata/instrument_trend/' + id + '/', {
          params: {
            expand: 'instrument'
          }
        })
      }
    },
    Expiry: {
      get: async (params) => {
        return api.get('/api/marketdata/expiry/', {
          ...params,
          ordering: '-date',
          limit: 4
        })
      }
    },
    Derivative: {
      get: async (params) => {
        return api.get('/api/marketdata/expiry/', {
          ...params
        })
      }
    },
    HistoricalData: {
      get: async (
        symbol,
        exchange,
        resolution,
        from,
        to,
        periodParams,
        continuous
      ) => {
        return api.post('/api/marketdata/historical_data/', {
          symbol,
          exchange,
          resolution,
          from,
          to,
          periodParams,
          continuous
        })
      }
    }
  },
  Alerts: {
    Alerts: {
      get: (params) => {
        return api.get('/api/alerts/alerts/', {
          params: {
            expand: 'instrument.expiry,instrument.underlying',
            limit: 10000,
            ...params
          }
        })
      },
      create: (data) => {
        return api.post('/api/alerts/alerts/', data)
      },
      update: (id, data) => {
        return api.put(`/api/alerts/alerts/${id}/`, data)
      },
      delete: (id) => {
        return api.delete(`/api/alerts/alerts/${id}/`)
      },
      bulk_delete: (params) => {
        return api.post('/api/alerts/alerts/bulk_delete/', params)
      },
      createFromCsv: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return api.post('/api/alerts/alerts/import_csv/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },
      createFromTTCsv: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return api.post('/api/alerts/alerts/import_tt_csv/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },
      downloadCsv: (params, fileName = 'alerts-export.csv') => {
        return api
          .post('/api/alerts/alerts/export_to_csv/', params, {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response.data, fileName)
          })
      }
    },
    AlertConfig: {
      get: (params) => {
        return api.get('/api/alerts/alertconfig/', {
          params: {
            expand: 'telegram_chat_id,wati_contact',
            ...params
          }
        })
      },
      update: (id, data) => {
        return api.put(`/api/alerts/alertconfig/${id}/`, data)
      }
    }
  },
  Telegram: {
    verify: (code) => {
      return api.post('/api/telegram/chat_id/verify/', { code })
    }
  },
  Wati: {
    get: (params) => {
      return api.get('/api/wati/waticontact/', { params })
    },
    create: (otpId) => {
      return api.post('/api/wati/waticontact/', { otp_id: otpId })
    },
    update: (id, otpId) => {
      return api.put('/api/wati/waticontact/' + id + '/', { otp_id: otpId })
    },
    delete: (id) => {
      return api.delete('/api/wati/waticontact/' + id + '/')
    },
    setPrimary: (id) => {
      return api.put('/api/wati/waticontact/' + id + '/set_primary/')
    }
  },
  Subscription: {
    Subscription: {
      get: (params) => {
        return api.get('/api/subscription/subscription/', {
          params: {
            ...params
          }
        })
      },
      validate_success: (payload) => {
        return api.post(
          '/api/subscription/subscription/validate_success/',
          payload
        )
      },
      cancel: (id) => {
        return api.post('/api/subscription/subscription/' + id + '/cancel/')
      },
      undoCancel: (id) => {
        return api.post(
          '/api/subscription/subscription/' + id + '/undo_cancel/'
        )
      }
    },
    UserComplimentarySubs: {
      get: (params) => {
        return api.get('/api/subscription/user_comp_subs/', {
          params: {
            ...params
          }
        })
      },
      activate: (id) => {
        return api.post(`/api/subscription/user_comp_subs/${id}/claim/`)
      }
    },

    UserFeatures: {
      get: (params) => {
        return api.get('/api/subscription/user_features/', {
          params: {
            ...params
          }
        })
      }
    },
    Plan: {
      get: (params) => {
        return api.get('/api/subscription/plan/', {
          params: {
            ...params
          }
        })
      }
    },
    BillingPlan: {
      subscribe: (id) => {
        return api.post('/api/subscription/billingplan/' + id + '/subscribe/')
      }
    },
    PlanGroup: {
      get: (params) => {
        return api.get('/api/subscription/plan_group/', {
          params: {
            ...params
          }
        })
      }
    },
    Order: {
      preview: (billingPlanIds, discountId) => {
        return api.post('/api/subscription/order/preview/', {
          order_items: billingPlanIds.map((id) => ({
            billing_plan: id
          })),
          discount: discountId
        })
      },
      create: (billingPlanIds, discountId) => {
        return api.post('/api/subscription/order/create/', {
          order_items: billingPlanIds.map((id) => ({
            billing_plan: id
          })),
          discount: discountId
        })
      },
      validate: (razorPayOrderId) => {
        return api.post('/api/subscription/order/validate/', {
          razorpay_id: razorPayOrderId
        })
      }
    },
    Discount: {
      getForUser: ({ planGroup }) => {
        return api.get('/api/subscription/discounts/user/', {
          params: {
            plan_group: planGroup
          }
        })
      }
    }
  },
  User: {
    login_with_otp: (phone, code) => {
      return api.post('/api/user/login_with_otp/', {
        phone,
        code
      })
    },
    update: (values) => {
      return api.put('/api/user/user/', values)
    },
    get: () => {
      return api.get('/api/user/user/')
    }
  },
  Otp: {
    send: (phone, reason) => {
      return api.post('/api/otp/send/', {
        phone,
        reason
      })
    },
    verify: (code, phone, reason) => {
      return api.post('/api/otp/verify/', {
        code,
        phone,
        reason
      })
    }
  },
  Ath: {
    Csv: {
      get: ({ date, limit }) => {
        return api.get('/api/ath/analysis/', {
          params: { date, limit }
        })
      }
    },
    Results: {
      get: (params = {}) => {
        return api.get('/api/ath/result/', {
          params: {
            expand: 'instrument',
            ...params
          }
        })
      },
      getById: (resultId) => {
        return api.get('/api/ath/result/' + resultId + '/')
      }
    },
    Portfolio: {
      get: (params) => {
        return api.get('/api/ath/portfolio/', { params })
      },
      create: (resultId, version) => {
        return api.post('/api/ath/portfolio/', {
          result: resultId
        })
      },
      delete: (resultId) => {
        return api.delete('/api/ath/portfolio/' + resultId + '/')
      }
    }
  },
  BNF: {
    BNFStatus: {
      get: (params = {}) => {
        return api.get('/api/bnf/bnf_status/', {
          params: {
            expand: 'instrument',
            ...params
          }
        })
      }
    },
    BNFTrade: {
      get: (params = {}) => {
        return api.get('/api/bnf/bnf_trade/', {
          params: {
            ...params
          }
        })
      }
    }
  },
  Support: {
    Ticket: {
      create: (data) => {
        return api.post('/api/support/ticket/', data)
      }
    }
  },
  AutoSheet: {
    Sheet: {
      download: () => {
        return api
          .get('/api/autosheet/download/', {
            responseType: 'blob'
          })
          .then((response) => {
            FileDownload(response?.data, 'Automated_Banknifty_Sheet.xls')
          })
      }
    }
  },
  Broker: {
    BTStrategyRun: {
      get: (params = {}) => {
        return api.get('/api/bt/strategy_run/', {
          params: {
            ...params
          }
        })
      }
    },
    trade: {
      get: (params = {}) => {
        return api.get('/api/broker/trade/', {
          params: {
            ...params
          }
        })
      }
    }
  }
}

export default ZenApi
