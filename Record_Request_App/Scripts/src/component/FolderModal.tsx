import * as React from 'react'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { IBoxData, IFolderData } from './App'
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  CheckboxVisibility
} from 'office-ui-fabric-react/lib/DetailsList'

// Styling

const Links = {
  color: '#0078d7',
  cursor: 'pointer',
} as React.CSSProperties

export interface IFolderModal {
  showModal: boolean
  openModal(i: number): void
  closeModal(): void
  filteredData: Array<IFolderData>
  selectedBox?: IBoxData
  addFolder(x): void 
 
}

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Folder Name',
    fieldName: 'folderName',
    minWidth: 100,
    maxWidth: 275,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: '',
    fieldName: 'checkoutFolder',
    minWidth: 100,
    maxWidth: 275,
    isResizable: true,
    ariaLabel: 'Operations for checkoutFolder'
  },
  {
    key: 'column3',
    name: '',
    fieldName: 'createFolder',
    minWidth: 100,
    maxWidth: 275,
    isResizable: true,
    ariaLabel: 'Operations for createFolder'
  }
]

// ----------------------------------------------

export function FolderModal(props: IFolderModal) {

  const folderIdList = props.filteredData.map((x, i) => ({
    key: i,
    folderName: (
      <p className="ms-fontSize-mPlus ms-fontWeight-light">
        {x.FolderName}
      </p>
    ),
    checkoutFolder: (
      <p
        style={Links}
        className="ms-fontSize-mPlus ms-fontWeight-light"
        onClick={() => props.addFolder({ key: i, folderName: x.FolderName })}
      >
        + Add Folder to Checkout
      </p>
    ),
    createFolder: (
      <p style={Links} className="ms-fontSize-mPlus ms-fontWeight-light">
        Create Folder
      </p>
    )
  }))

  console.log(props.filteredData)

  return (
    <div>
      <Modal
        isOpen={props.showModal}
        onDismiss={props.closeModal}
        isBlocking={false}
        isDarkOverlay={false}
        containerClassName="ms-modalExample-container"
      >
        <div className="ms-modalExample-header">
          Box B{props.selectedBox.BoxIdBarCode}
        </div>
        <div className="ms-modalExample-body">
        <DetailsList
          items={folderIdList}
          columns={_columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
      </Modal>
    </div>
  )
}
