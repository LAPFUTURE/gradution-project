import React, { useState } from 'react'
import { uploadFileUrl } from '../../api'
import { Upload, Modal, Input, Button } from 'antd'
import { PlusOutlined, SendOutlined } from '@ant-design/icons'

const { TextArea } = Input
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  });
}

export default function Public() {
  let [previewVisible, setPreviewVisible] = useState(false)
  let [previewImage, setPreviewImage] = useState('')
  let [fileList, setFileList] = useState<any>([{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ])

  let handleCancel = () => setPreviewVisible(false)

  let handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };

  let handleChange = (a:any) => {
    setFileList(a.fileList)
  }
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div style={{ marginTop: 24 }}>
        <Upload
          className="space-around"
          action={uploadFileUrl}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div style={{ paddingLeft:24, paddingRight:24, paddingTop: 24 }}>
          <Input addonBefore="品名" placeholder="取一个可爱的名字吧~"/>
          <br/>
          <br/>
          <Input addonBefore="标题" placeholder="取一个响当当的标题~"/>
          <br/>
          <br/>
          <TextArea placeholder="来描述一下~" autoSize={{ minRows: 3, maxRows: 6 }} />
          <br/>
          <br/>
          <p className="text-center">
            <Button type="primary">发布~ <SendOutlined/></Button>
          </p>
        </div>
      </div>
    )
}