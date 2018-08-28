import * as React from "react"
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    CheckboxVisibility,
    Sticky,
    CommandBar,
    StickyPositionType,
    ScrollablePane,
} from "office-ui-fabric-react"
import "./styles.scss"
import { DetailListHeader } from ".."
import { observer } from "mobx-react"
import { DataStore, Folder } from "../../stores"

export interface IFolderListProps {
    emptyMessage: string
    ds: DataStore
}

export const FolderList = observer((props: IFolderListProps) => {
    const columns: IColumn[] = [
        {
            key: "column1",
            name: "Folder Name",
            fieldName: "FolderName",
            minWidth: 60,
            maxWidth: 80,
            ariaLabel: "Operations for name",
            onRender: (item: Folder) => {
                return <p>{`${item.FolderName}`}</p>
            },
        },
        // {
        //     key: "column2",
        //     name: "",
        //     fieldName: "checkoutFolder",
        //     className: "folderrow",
        //     minWidth: 40,
        //     maxWidth: 150,
        //     isResizable: true,
        //     ariaLabel: "Operations for checkoutFolder",
        //     onRender: (item: Folder) => {
        //         return item.status === ItemStatusTypes.available &&
        //             item.addable ? (
        //             <button
        //                 onClick={item.request}
        //                 className={"ms-fontSize-mms-fontWeight-light"}
        //             >
        //                 {item.status}
        //             </button>
        //         ) : (
        //             <p className="ms-fontSize-mms-fontWeight-light">
        //                 {item.status}
        //             </p>
        //         )
        //     },
        // },
    ]
    return (
        <div
            className={
                "ms-Grid-col ms-sm3 scroll-container ms-fontSize-sPlus ms-fontWeight-light"
            }
        >
            {props.ds.selectedBox ? (
                <ScrollablePane>
                    <DetailListHeader
                        title={`Folders in Box B${props.ds.selectedBox.BoxId}`}
                    />

                    <Sticky stickyPosition={StickyPositionType.Header}>
                        <CommandBar
                            farItems={
                                props.ds.selectedFolder && [
                                    {
                                        key: "requestBox",
                                        iconProps: {
                                            iconName: "add",
                                        },
                                        onClick:
                                            props.ds.selectedFolder.request,
                                        text: "Request",
                                        disabled: !props.ds.selectedFolder
                                            .addable,
                                        style: {
                                            fontSize: 12,
                                        },
                                    },
                                ]
                            }
                            items={
                                props.ds.selectedFolder && [
                                    {
                                        key: "folderStatus",
                                        text: `Status: ${
                                            props.ds.selectedFolder.status
                                        }`,
                                        className:
                                            "ms-font-s ms-fontWeight-light",
                                        style: {
                                            fontSize: 12,
                                        },
                                    },
                                ]
                            }
                        />
                    </Sticky>
                    <div>
                        <DetailsList
                            items={props.ds.selectedBox.dataFromFolders || []}
                            columns={columns}
                            compact={true}
                            layoutMode={DetailsListLayoutMode.justified}
                            checkboxVisibility={CheckboxVisibility.hidden}
                            onActiveItemChanged={(_folder: Folder) =>
                                _folder.select()
                            }
                            onRenderRow={(_props, defaultRender) => (
                                <div
                                    key={_props.item.key}
                                    className={"folderrow"}
                                >
                                    {defaultRender(_props)}
                                </div>
                            )}
                        />
                    </div>
                </ScrollablePane>
            ) : (
                <div className={"empty-message"}>
                    {<DetailListHeader title={props.emptyMessage} />}
                </div>
            )}
        </div>
    )
})

export default FolderList
