import * as React from "react"
import {
    PrimaryButton,
    DetailsList,
    IColumn,
    CheckboxVisibility,
    IconButton,
    Icon,
    DetailsListLayoutMode,
} from "office-ui-fabric-react"
import "./styles.scss"
import { DetailListHeader } from ".."
import { observer } from "mobx-react"
import { IFolderOrBox } from "../../models/StoreModels"

export interface ICheckoutProps {
    cart: Array<IFolderOrBox>
    classNames: string
    dialogMessage: string
    initializeRequestForm(): void
    removeFromCart(item): void
}

// --------------------------------------------------------------------------

export const Checkout = observer((props: ICheckoutProps) => {
    const columns: IColumn[] = [
        {
            key: "column1",
            name: "Item",
            fieldName: "pendingItemRequests",
            minWidth: 50,
            maxWidth: 120,
            isResizable: false,
            ariaLabel: "Operations for pendingItemRequests",
            onRender: (item: IFolderOrBox) => (
                <div>
                    {item.FolderId ? (
                        <Icon iconName="FabricFolder" />
                    ) : (
                        <Icon iconName="GiftboxSolid" />
                    )}
                    <p>
                        {item.FolderId ? `-  ${item.FolderName}` : item.BoxId}
                    </p>
                </div>
            ),
        },
        {
            key: "column2",
            name: "Type",
            fieldName: "type",
            minWidth: 20,
            maxWidth: 70,
            isResizable: false,
            ariaLabel: "Operations for type",
            onRender: (item: IFolderOrBox) => (
                <p>{item.FolderId ? "Folder" : "Box"}</p>
            ),
        },
        {
            key: "column3",
            name: "Parent Box/Dep",
            fieldName: "parentBox",
            minWidth: 30,
            maxWidth: 90,
            isResizable: false,
            ariaLabel: "Operations for parentBox",
            onRender: (item: IFolderOrBox) => (
                <p>
                    {item.FolderId
                        ? `Box - ${item.BoxId}`
                        : `Dep - ${item.DeptId}`}
                </p>
            ),
        },
        {
            key: "column4",
            name: "",
            fieldName: "removeItem",
            minWidth: 40,
            isResizable: false,
            ariaLabel: "Operations for removeItem",
            onRender: (item: IFolderOrBox) => (
                <IconButton
                    iconProps={{
                        iconName: "cancel",
                    }}
                    className={"delete-icon"}
                    onClick={() =>
                        props.removeFromCart(
                            item.FolderId ? item.FolderId : item.BoxId
                        )
                    }
                    disabled={props.dialogMessage.length !== 0}
                />
            ),
        },
    ]
    return (
        <div className={`${props.classNames}`}>
            {props.cart.length > 0 && (
                <div>
                    <DetailListHeader title={"Checkout"} />
                    <DetailsList
                        items={props.cart}
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
                            onClick={props.initializeRequestForm}
                            disabled={props.dialogMessage.length !== 0}
                        />
                    </div>
                </div>
            )}
        </div>
    )
})

export default Checkout
