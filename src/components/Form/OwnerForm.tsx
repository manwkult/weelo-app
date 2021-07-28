import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, DatePicker, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { getBase64, customRequest } from '../../utils/image';

interface Props {
  owner: any;
  visible: boolean;
  onCreate: (value: any, image: any) => void;
  onCancel: () => void;
}

const OwnerForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState({ loading: false, imageUrl: '' });

  useEffect(() => {
    form.setFieldsValue({
      ...props.owner
    });
  }, [props.owner]);

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

  const handleChange = async (info: any) => {
    if (info.file.status === 'uploading') {
      setImage({ loading: true, imageUrl: image.imageUrl });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const imageUrl = await getBase64(info.file.originFileObj);
      setImage({ loading: false, imageUrl });
    }
  }

  const onOk = () => {
    form
      .validateFields()
      .then(values => {
        clean();
        props.onCreate(values, image.imageUrl);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const onCancel = () => {
    clean();
    props.onCancel();
  }

  const clean = () => {
    form.resetFields();
    setImage({ loading: false, imageUrl: '' });
  }

  const uploadButton = (
    <div>
      {image.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <React.Fragment>
      <Modal
        title="Owner"
        style={{ top: 20 }}
        visible={props.visible}
        onCancel={onCancel}
        onOk={onOk}
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
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of owner!', max: 120 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address of owner!', max: 255 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[{ required: true, message: 'Please input the birthday of owner!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Photo"
            rules={[{ required: true, message: 'Please input the photo of owner!' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {image.imageUrl ? <img src={image.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default OwnerForm;