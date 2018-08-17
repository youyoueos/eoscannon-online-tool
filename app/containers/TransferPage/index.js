/*
 * TransferPage
 *
 */
import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Icon, Input, Select, Card, Col, Row } from 'antd';
import eosioAbi from './abi';
import eosIqAbi from './iqAbi';
import adcAbi from './adcAbi';
import {
  formItemLayout,
  getEos,
  symbolList,
  openTransactionFailNotification,
} from '../../utils/utils';
import { LayoutContent } from '../../components/NodeComp';
import ScanQrcode from '../../components/ScanQrcode';
import DealGetQrcode from '../../components/DealGetQrcode';
import messages from './messages';
import utilsMsg from '../../utils/messages';

import { makeSelectNetwork } from '../LanguageProvider/selectors';

const FormItem = Form.Item;
const { Option } = Select;

export class TransferPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eos: null,
      formatMessage: this.props.intl.formatMessage,
      GetTransactionButtonState: false, // 获取报文按钮可点击状态
      QrCodeValue: this.props.intl.formatMessage(utilsMsg.QrCodeInitValue), // 二维码内容
      transaction: {},
      contract: 'eosio.token',
    };
  }
  /**
   * 输入框内容变化时，改变按钮状态
   * */
  componentWillReceiveProps(nextProps) {
    this.onValuesChange(nextProps);
  }
  /**
   * 输入框内容变化时，改变按钮状态
   * */
  onValuesChange = nextProps => {
    const values = nextProps.form.getFieldsValue();
    const {
      FromAccountName,
      ToAccountName,
      transferQuantity,
      transferSymbol,
    } = values;
    this.setState({
      GetTransactionButtonState:
        !!FromAccountName &&
        !!ToAccountName &&
        !!transferQuantity &&
        !!transferSymbol,
    });
  };

  handleChange = val => {
    this.setState({
      contract: val.key,
    });
  };
  /**
   * 用户点击生成报文，根据用户输入参数，生成签名报文，并将其赋值到文本框和生成对应的二维码
   * */
  handleGetTransaction = () => {
    if (!this.state.GetTransactionButtonState) {
      return;
    }
    const values = this.props.form.getFieldsValue();
    const eos = getEos(this.props.SelectedNetWork);
    const {
      FromAccountName,
      ToAccountName,
      transferQuantity,
      transferMemo,
      transferSymbol,
    } = values;
    let transferDigit = 4;
    if (
      this.state.contract !== 'eosio' &&
      this.state.contract !== 'eosio.token'
    ) {
      if (this.state.contract.toUpperCase() === 'EVERIPEDIAIQ') {
        transferDigit = 3;
        eos.fc.abiCache.abi(this.state.contract, eosIqAbi);
      } else if (this.state.contract.toUpperCase() === 'CHALLENGEDAC') {
        eos.fc.abiCache.abi(this.state.contract, adcAbi);
      } else {
        eos.fc.abiCache.abi(this.state.contract, eosioAbi);
      }
    }
    const transferContract = this.state.contract;
    eos
      .transaction(
        {
          actions: [
            {
              account: transferContract,
              name: 'transfer',
              authorization: [
                {
                  actor: FromAccountName,
                  permission: 'active',
                },
              ],
              data: {
                from: FromAccountName,
                to: ToAccountName,
                quantity: `${Number(transferQuantity).toFixed(
                  Number(transferDigit),
                )} ${transferSymbol.label.toUpperCase()}`,
                memo: transferMemo || '',
              },
            },
          ],
        },
        {
          sign: false,
          broadcast: false,
        },
      )
      .then(tr => {
        this.setState({
          eos,
          transaction: tr.transaction,
        });
      })
      .catch(err => {
        openTransactionFailNotification(this.state.formatMessage, err.name);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const TransferFromAccountNamePlaceholder = this.state.formatMessage(
      messages.TransferFromAccountNamePlaceholder,
    );
    const TransferToAccountNamePlaceholder = this.state.formatMessage(
      messages.TransferToAccountNamePlaceholder,
    );
    const TransferQuantityPlaceholder = this.state.formatMessage(
      messages.TransferQuantityPlaceholder,
    );
    const TransferDigitPlaceholder = this.state.formatMessage(
      messages.TransferDigitPlaceholder,
    );
    const TransferSymbolPlaceholder = this.state.formatMessage(
      messages.TransferSymbolPlaceholder,
    );
    const TransferMemoPlaceholder = this.state.formatMessage(
      messages.TransferMemoPlaceholder,
    );
    const TransferMemoHelp = this.state.formatMessage(
      messages.TransferMemoHelp,
    );
    const FromLabel = this.state.formatMessage(messages.FromLabel);
    const ToLabel = this.state.formatMessage(messages.ToLabel);
    const QuantityLabel = this.state.formatMessage(messages.QuantityLabel);
    const SymbolLabel = this.state.formatMessage(messages.SymbolLabel);
    const ProducersDealTranscation = this.state.formatMessage(
      utilsMsg.ProducersDealTranscation,
    );
    const ProducersSendTranscation = this.state.formatMessage(
      utilsMsg.ProducersSendTranscation,
    );
    return (
      <LayoutContent>
        <Row gutter={16}>
          <Col span={12}>
            <Card title={ProducersDealTranscation} bordered={false}>
              <FormItem {...formItemLayout} label={FromLabel} colon>
                {getFieldDecorator('FromAccountName', {
                  rules: [
                    {
                      required: true,
                      message: TransferFromAccountNamePlaceholder,
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder={TransferFromAccountNamePlaceholder}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ToLabel} colon>
                {getFieldDecorator('ToAccountName', {
                  rules: [
                    {
                      required: true,
                      message: TransferToAccountNamePlaceholder,
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder={TransferToAccountNamePlaceholder}
                  />,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={QuantityLabel} colon>
                {getFieldDecorator('transferQuantity', {
                  rules: [
                    { required: true, message: TransferQuantityPlaceholder },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon
                        type="pay-circle-o"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder={TransferQuantityPlaceholder}
                  />,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={SymbolLabel} colon>
                {getFieldDecorator('transferSymbol', {
                  initialValue: { key: 'EOS', label: 'EOS' },
                  rules: [
                    { required: true, message: TransferSymbolPlaceholder },
                  ],
                })(
                  <Select
                    labelInValue
                    style={{ width: '100%' }}
                    onChange={this.handleChange}
                    placeholder={TransferDigitPlaceholder}
                  >
                    {symbolList.map(item => (
                      <Option key={item.contract} value={item.contract}>
                        {item.symbol}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
              <FormItem
                help={TransferMemoHelp}
                {...formItemLayout}
                label="Memo"
                colon
              >
                {getFieldDecorator('transferMemo', {
                  rules: [
                    { required: false, message: TransferMemoPlaceholder },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon
                        type="pay-circle-o"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder={TransferMemoPlaceholder}
                  />,
                )}
              </FormItem>
              <DealGetQrcode
                eos={this.state.eos}
                form={this.props.form}
                formatMessage={this.state.formatMessage}
                GetTransactionButtonClick={this.handleGetTransaction}
                GetTransactionButtonState={this.state.GetTransactionButtonState}
                QrCodeValue={this.state.QrCodeValue}
                transaction={this.state.transaction}
                SelectedNetWork={this.props.SelectedNetWork}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={ProducersSendTranscation} bordered={false}>
              <ScanQrcode
                eos={this.state.eos}
                form={this.props.form}
                formatMessage={this.state.formatMessage}
                SelectedNetWork={this.props.SelectedNetWork}
                transaction={this.state.transaction}
              />
            </Card>
          </Col>
        </Row>
      </LayoutContent>
    );
  }
}

TransferPage.propTypes = {
  form: PropTypes.object,
  intl: PropTypes.object,
  SelectedNetWork: PropTypes.string,
};

const TransferPageIntl = injectIntl(TransferPage);
const TransferPageForm = Form.create()(TransferPageIntl);
const mapStateToProps = createStructuredSelector({
  SelectedNetWork: makeSelectNetwork(),
});

export default connect(mapStateToProps)(TransferPageForm);
