import styled from 'styled-components'
import { Layout, Form } from 'antd'

const { Content } = Layout

const LayoutContent = styled(Content)`
  background: #f2f4f6;
  padding: 16px;
  position: relative;
  &.ant-layout-content {
    min-height: auto;
  }
  .ant-btn-sm {
    padding: 0 14px;
    font-size: 10px;
    border-radius: 4px;
    height: 24px;
  }
`

const LayoutContentBox = styled.div`
  padding: 16px;
  min-height: 600px;
`

const FormComp = styled(Form)`
  &.ant-form {
    margin: 0 auto;
  }
  .form-button {
    display: block;
    padding: 0 45px;
    margin: 0 auto;
  }
  .ant-form-item-label {
    text-align: left;
  }
`

export { LayoutContent, LayoutContentBox, FormComp }
