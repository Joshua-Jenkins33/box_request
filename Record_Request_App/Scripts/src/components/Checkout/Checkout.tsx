import * as React from "react"
import {
    PrimaryButton,
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    CheckboxVisibility,
    IconButton,
} from "office-ui-fabric-react"

import { ModalTypes } from "../../models/App"

import "./styles.scss"
import DetailListHeader from "../DetailListHeader/DetailListHeader"
import { observer } from "mobx-react"
import { RequestState } from "../../stores/RequestStore/RequestState"
import { IFolderOrBox } from "../../models/StoreModels"

export interface ICheckoutProps {
    requestState: RequestState
    classNames: string
    initializeRequesetForm(): void
}

// --------------------------------------------------------------------------

export const Checkout = observer((props: ICheckoutProps) => {
    const columns: IColumn[] = [
        {
            key: "column1",
            name: "Item",
            fieldName: "pendingItemRequests",
            minWidth: 50,
            maxWidth: 60,
            isResizable: false,
            ariaLabel: "Operations for pendingItemRequests",
            onRender: (item: IFolderOrBox) => (
                <p>
                    {item.BoxIdBarCode
                        ? `B${item.BoxIdBarCode}`
                        : item.FolderName}
                </p>
            ),
        },
        {
            key: "column2",
            name: "Type",
            fieldName: "type",
            minWidth: 20,
            maxWidth: 40,
            isResizable: false,
            ariaLabel: "Operations for type",
            onRender: (item: IFolderOrBox) => (
                <p>{item.BoxIdBarCode ? "Box" : "Folder"}</p>
            ),
        },
        {
            key: "column3",
            name: "",
            fieldName: "removeItem",
            minWidth: 40,
            maxWidth: 40,
            isResizable: false,
            ariaLabel: "Operations for removeItem",
            onRender: (item: IFolderOrBox) => (
                <IconButton
                    iconProps={{
                        iconName: "cancel",
                    }}
                    onClick={() =>
                        props.requestState.removeFromCart(
                            item.BoxID
                                ? item.FolderIdBarCode
                                : item.BoxIdBarCode
                        )
                    }
                />
            ),
        },
    ]
    return (
        <div className={`${props.classNames} checkout-wrapper`}>
            {props.requestState.cart.length > 0 && (
                <div>
                    <DetailListHeader title={"Checkout"} />
                    <DetailsList
                        items={props.requestState.cart}
                        columns={columns}
                        compact={true}
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        checkboxVisibility={CheckboxVisibility.hidden}
                        onRenderRow={(_props, defaultRender) => (
                            <div key={_props.itemIndex}>
                                {defaultRender({
                                    ..._props,
                                    className: "checkout-row",
                                })}
                            </div>
                        )}
                    />
                    <div className={"checkout-submit"}>
                        <PrimaryButton
                            text={"Submit Request"}
                            onClick={props.initializeRequesetForm}
                        />
                    </div>
                </div>
            )}
        </div>
    )
})
