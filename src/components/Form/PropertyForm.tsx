import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Drawer, Select, Button, Row, Col, message, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

import { Owner } from '../../models/Owner';
import { Property } from '../../models/Property';
import { PropertyImage } from '../../models/PropertyImage';

import { getBase64, customRequest } from '../../utils/image';

const { Option } = Select;

interface Props {
  property: Property;
  owners?: Owner[];
  visible: boolean;
  onCreate: (value: any, images: PropertyImage[]) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: ''
  });

  const [images, setImages] = useState([] as UploadFile[]);
  const [propertyImages, setPropertyImages] = useState([] as PropertyImage[]);

  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue({
        ...props.property
      });

      const files = props.property.propertyImages.map(image => ({
        uid: image.id.toString(),
        name: `image-${image.id}`,
        status: 'done',
        url: image.file
      } as UploadFile));

      const data = [] as PropertyImage[];
      props.property.propertyImages.forEach(image => {
        data.push({
          id: 0,
          file: image.file,
          enabled: true
        });
      });

      setImages(files);
      setPropertyImages(data);
    }
  }, [props.visible]);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = async ({ fileList }: any) => {
    setImages(fileList);

    const data = [] as PropertyImage[];
    fileList.map(async (file: any) => {
      data.push({
        id: 0,
        file: file.url ? file.url : await getBase64(file.originFileObj),
        enabled: true
      });

      setPropertyImages(data);
    });    
  }

  const handlePreview = async (file: any) => {
    if (!file.url) {
      const imageUrl = await getBase64(file.originFileObj);
      setPreview({
        previewImage: imageUrl,
        previewVisible: true,
        previewTitle: file.name
      });
    } else {
      setPreview({
        previewImage: file.url,
        previewVisible: true,
        previewTitle: file.name
      });
    }
  };

  const handleCancel = () => setPreview({
    previewImage: '',
    previewVisible: false,
    previewTitle: ''
  });

  const onOk = async () => {
    form
      .validateFields()
      .then(async values => {
        const valid = validate(values);

        if (valid) {
          form.resetFields();
          props.onCreate(values, propertyImages);
        } else {
          message.error('The Internal Code is not valid!')
          message.error('Internal Code example: INT001')
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const onCancel = () => {
    form.resetFields();
    props.onCancel();
  }

  const validate = (values: any): boolean => {
    return values.internalCode.startsWith('INT');
  }

  return (
    <React.Fragment>
      <Drawer
        title="Property"
        width={720}
        visible={props.visible}
        onClose={onCancel}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onOk} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          name="form"
        >
          <Form.Item
            name="id"
            hidden={true}
          >
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the a name of property valid!', max: 120 }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please input the a address of property valid!', max: 255 }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="internalCode"
                label="Internal Code"
                rules={[{ required: true, message: 'Please input the a internal code of property valid!', max: 15 }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
                <Select
                  placeholder="Select a owner"
                  allowClear
                >
                  {
                    props.owners?.map((owner: Owner) => (
                      <Option value={`${owner.id} - ${owner.name}`} key={owner.id}>{`${owner.id} - ${owner.name}`}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input the a price of property valid!', type: 'number', max: 999999999999 }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Year"
                rules={[{ required: true, message: 'The year is not valid!', type: 'number', min: 1500, max: 3000 }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <p>
            Images
          </p>
          <Row gutter={16}>
            <Col span={24}>
              <Upload
                customRequest={customRequest}
                listType="picture-card"
                fileList={images}
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
              <Modal
                visible={preview.previewVisible}
                title={preview.previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img alt="image" style={{ width: '100%' }} src={preview.previewImage} />
              </Modal>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </React.Fragment>
  )
}

export default PropertyForm;