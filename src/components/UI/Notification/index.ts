import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  .toast {
    border: ${(props) => props.theme.notification.toast.toast.border};
    background: ${(props) => props.theme.notification.toast.toast.bg};
  }

  .body {
    font-size: ${(props) => props.theme.font.sizes.md};
    line-height: ${(props) => props.theme.font.lineHeights.md};
  }

  .progress {
    background: ${(props) =>
      props.theme.notification.toast.progress.bg.default};
  }

  .Toastify__toast--error {
    .progress {
      background: ${(props) =>
        props.theme.notification.toast.progress.bg.error};
    }
    .body {
      color: ${(props) => props.theme.notification.toast.body.color.error};
      ::before {
        content: 'Error: ';
      }
    }
  }

  .Toastify__toast--success {
    .progress {
      background: ${(props) =>
        props.theme.notification.toast.progress.bg.success};
    }
    .body {
      color: ${(props) => props.theme.notification.toast.body.color.success};
      ::before {
        content: 'Success: ';
      }
    }
  }
`

export { StyledToastContainer }
