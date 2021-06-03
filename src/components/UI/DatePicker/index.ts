import styled from 'styled-components'

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker {
    font-size: 1.2rem;
    width: 100%;
  }
  .react-datepicker__header {
    padding-top: 1em;
  }
  .react-datepicker__month {
    margin: 0.4em 1em;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 1.9em;
    line-height: 1.9em;
    margin: 0.166em;
  }
  .react-datepicker__current-month {
    font-size: 1em;
    padding-bottom: 0.5em;
  }
  .react-datepicker__triangle {
    transform: translate(205px, 0px) !important;
  }
`

export { DatePickerWrapper }
