import React, { useState } from 'react'
import { uploadFileUrl, postPublish } from '../../api'
import { Upload, Modal, Input, Button, message } from 'antd'
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
  let [name, setName] = useState('')
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [pic] = useState('')

  let doPostPublish = async () => {
    let res:any = await postPublish({name, title, description, pic})
    let { code, msg } = res
    code === 0 ? message.success(msg) : msg.error(msg)
  }

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
          <Input addonBefore="品名"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            placeholder="取一个可爱的名字吧~"
          />
          <br/>
          <br/>
          <Input addonBefore="标题"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            placeholder="取一个响当当的标题，可以写店家名让更多人知道哦~"
          />
          <br/>
          <br/>
          <TextArea
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder="来描述一下~"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
          <br/>
          <br/>
          <p className="text-center">
            <Button type="primary" onClick={() => {doPostPublish()}}>发布~ <SendOutlined/></Button>
          </p>
        </div>
      </div>
    )
}