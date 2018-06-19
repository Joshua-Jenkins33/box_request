import * as React from "react"
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    CheckboxVisibility,
} from "office-ui-fabric-react"
import { IBox, IFolderOrBox } from "../../models/StoreModels"
import "./styles.scss"
import DetailListHeader from "../DetailListHeader/DetailListHeader"
import { observer } from "mobx-react"
import { RequestState } from "../../stores/RequestStore/RequestState"
import { ModalTypes } from "../../models"

export interface IBoxListProps {
    checkoutStatus(box: IFolderOrBox): string
    boxes: Array<IBox>
    classNames: string
    requestState: RequestState
    cartContains(item: IFolderOrBox): boolean
    initializeFolderForm(): void
}

// --------------------------------------------------------------------------

export const BoxList = observer((props: IBoxListProps) => {
    const columns: IColumn[] = [
        {
            key: "column1",
            name: "Box Number",
            fieldName: "boxNumber",
            className: "boxlist-row-row",
            minWidth: 50,
            maxWidth: 85,
            isResizable: true,
            ariaLabel: "Operations for name",
            onRender: (item: IBox) => <p>{`B${item.BoxIdBarCode}`}</p>,
        },
        {
            key: "column2",
            name: "",
            className: "boxlist-row-row",
            fieldName: "checkoutBox",
            minWidth: 50,
            maxWidth: 160,
            isResizable: true,
            ariaLabel: "Operations for checkoutBox",
            onRender: (item: IBox) => {
                return props.checkoutStatus(item)[0] === "+" ? (
                    <button
                        onClick={() => props.requestState.addToCart(item)}
                        className={"ms-fontSize-mPlus ms-fontWeight-light"}
                    >
                        {props.checkoutStatus(item)}
                    </button>
                ) : (
                    <p className="boxlist-row-disabled">
                        {props.checkoutStatus(item)}
                    </p>
                )
            },
        },
        {
            key: "column3",
            name: "",
            fieldName: "createFolder",
            minWidth: 50,
            maxWidth: 100,
            isResizable: true,
            ariaLabel: "Operations for createFolder",
            onRender: (item: IBox) => {
                return props.checkoutStatus(item)[0] === "+" && !props.requestState.cartContains(item) ? (
                <button
                    className={"ms-fontSize-mPlus ms-fontWeight-light"}
                    onClick={props.initializeFolderForm}
                >
                    Create Folder
                </button>
                ) : (
                    <p>Create Folder</p>
                )
            },
        },
    ]

    return (
        <div className={props.classNames}>
            {props.boxes.length > 0 && (
                <>
                    <DetailListHeader title={"Boxes"} />
                    <DetailsList
                        items={props.boxes}
                        columns={columns}
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        checkboxVisibility={CheckboxVisibility.hidden}
                        onRenderRow={(_props, defaultRender) => {

                            return (
                                <div
                                    key={_props.item.key}
                                    onClick={() => {
                                        props.requestState.box = _props.item
                                    }}
                                    className={"boxlist-row"}
                                >
                                    {defaultRender({
                                        ..._props,
                                        className: props.requestState.cartContains(
                                            _props.item
                                        )
                                            ? "boxlist-row-disabled ms-fontSize-mPlus ms-fontWeight-light"
                                            : "boxlist-row ms-fontSize-mPlus ms-fontWeight-light",
                                    })}
                                </div>
                            )
                        }}
                    />
                </>
            )}
        </div>
    )
})
