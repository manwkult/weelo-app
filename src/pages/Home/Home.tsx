import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Layout, Button, Tag, Space, Popover, Popconfirm, message, Row, Col } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusCircleOutlined, UserAddOutlined } from '@ant-design/icons';

import PropertyForm from '../../components/Form/PropertyForm';
import OwnerForm from '../../components/Form/OwnerForm';
import PropertyTable from '../../components/Table/PropertyTable';
import Filter from '../../components/Widgets/Filter';

import { ApplicationState } from '../../store';
import * as PropertyStore from '../../store/Property';
import * as OwnerStore from '../../store/Owner';

import { Property } from '../../models/Property';
import { Owner } from '../../models/Owner';
import { PropertyImage } from '../../models/PropertyImage';

import * as initValues from '../../utils/initValues';

const { Header, Content } = Layout;

type HomeProps =
  ApplicationState &
  typeof PropertyStore.actionCreators &
  typeof OwnerStore.actionCreators &
  RouteComponentProps<{}>;

class Home extends React.PureComponent<HomeProps> {
  state = {
    property: initValues.property,
    owner: initValues.owner,
    showOwnerModal: false,
    showPropertyDrawer: false
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Internal Code',
      dataIndex: 'internalCode',
      key: 'internalCode',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    {
      title: 'Owner',
      key: 'owner',
      dataIndex: 'owner',
      render: (text: any, record: any) => {
        const content = <img src={record.owner.photo} width="200" height="200"></img>
        return (
          <Popover content={content} title="Owner" trigger="hover">
            <Tag color={'geekblue'} key={record.owner.id}>
              {record.owner.name.toUpperCase()}
            </Tag>
          </Popover>)
      }
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <EditTwoTone className="pointer" onClick={() => this.edit(record.id)} />
          <Popconfirm
            title="Are you sure to delete this property?"
            onConfirm={() => this.delete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone twoToneColor="#eb2f96" className="pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(previousProps: any, previousState: any) {
    if (previousState === this.state) {
      if (this.props.properties?.created ||
        this.props.properties?.updated ||
        this.props.properties?.deleted) {
        this.load();
        message.success(this.props.properties.message);
      } else if (this.props.owners?.created) {
        this.load();
        message.success(this.props.owners.message);
      }
    }
  }

  load = () => {
    if (!this.props.authentication?.authenticated) {
      this.props.history.push('/login');
    }

    this.props.getAllOwners();
    this.props.getAllProperties();
  }

  onSearch = (value: string) => {
    this.props.filterProperties(value);
  }

  setPropertyDrawerVisible = (value: boolean) => {
    this.setState({
      property: initValues.property,
      showPropertyDrawer: value
    });
  }

  setOwnerModalVisible = (value: boolean) => {
    this.setState({
      showOwnerModal: value
    });
  }

  edit(id: number) {
    const property = this.props.properties?.data.filter(item => item.id === id).map(item => ({
      ...item,
      owner: `${item.owner.id} - ${item.owner.name}`
    }))[0];

    this.setState({
      property,
      showPropertyDrawer: true
    });
  }

  delete(id: number) {
    this.props.deleteProperty(id);
  }

  createOwner = (value: any, image: any) => {
    this.setOwnerModalVisible(false);

    const owner = value as Owner
    owner.photo = image;
    this.props.createOwner(owner);
  }

  createProperty = (value: any, images: PropertyImage[]) => {
    this.setPropertyDrawerVisible(false);

    const ownerId = value.owner.split('-')[0];
    value.ownerId = parseInt(ownerId.trim());

    value.propertyImages = images;

    const property = value as Property
    if (property.id === 0) {
      this.props.createProperty(property);
    } else {
      this.props.updateProperty(property);
    }
  }

  cancelOwnerModal = () => {
    this.setOwnerModalVisible(false);
  }

  cancelPropertyModal = () => {
    this.setPropertyDrawerVisible(false);
  }

  public render() {
    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={8}>
            <Filter onSearch={this.onSearch} />
          </Col>
          <Col span={16}>
            <div className="right">
              <Space size="middle">
                <Button type="primary" icon={<UserAddOutlined />} size="large" onClick={() => this.setOwnerModalVisible(true)}>
                  Add Owner
                </Button>
                <Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={() => this.setPropertyDrawerVisible(true)}>
                  Add Property
                </Button>
              </Space>
              <OwnerForm
                owner={this.state.owner}
                visible={this.state.showOwnerModal}
                onCreate={this.createOwner}
                onCancel={this.cancelOwnerModal}
              />
              <PropertyForm
                property={this.state.property}
                owners={this.props.owners?.data}
                visible={this.state.showPropertyDrawer}
                onCreate={this.createProperty}
                onCancel={this.cancelPropertyModal}
              />
            </div>
          </Col>
        </Row>
        <div className="table">
          {
            this.props.properties && this.props.properties.data.length > 0 &&
              <PropertyTable
                data={this.props.properties.filters ? this.props.properties.filters : this.props.properties.data}
                columns={this.columns}
              />
          }
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state, { ...PropertyStore.actionCreators, ...OwnerStore.actionCreators }
)(Home as any);