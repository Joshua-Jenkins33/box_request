import { action, observable, computed } from "mobx"
import { IFolder, IFolderOrBox, IBox } from "../../models/StoreModels"
import { ModalTypes, ItemStatusTypes } from "../../models"
import { RootStore } from "../RootStore/RootStore"
import { FolderForm } from "./FolderForm"
import { RequestForm } from "./RequestForm"
import { MessageBarType } from "office-ui-fabric-react"
import { CheckoutStore } from "../CheckoutStore"
import { DataStore } from "../DataStore"
export class UIStore {
    constructor(_root: RootStore) {
        this.root = _root
    }

    root: RootStore

    @observable
    folderForm: FolderForm

    @observable
    requestForm: RequestForm

    @observable
    modal: ModalTypes = ModalTypes.none

    @observable
    dialogMessage: string = ""

    @observable
    msgBarMessage: string = ""

    @observable
    mBarType: MessageBarType = undefined

    init = async () => {
        return
    }

    @action
    clearModal = () => (this.modal = ModalTypes.none)

    @action
    initializeFolderForm = (): void => {
        this.modal = ModalTypes.create
        this.folderForm = new FolderForm(
            this.root.dataStore.selectedBox.folders.map(_folder =>
                _folder.FolderName.toLowerCase()
            )
        )
    }

    @action
    clearMessage = () => {
        this.dialogMessage = ""
        this.msgBarMessage = ""
    }

    @action
    createFolder = (): void => {
        this.root.dataService.createFolder({
            BoxId: this.root.dataStore.selectedBox.BoxId,
            FolderName: this.folderForm.folderName,
            CurrentFolderLocation: String(
                this.root.dataStore.selectedBox.BoxId
            ),
            FolderDescription: "",
        })
        // if (!this.cartContains) {
        //     this.checkoutStore.addToCart(this.folders[this.folders.length - 1])
        // }
        this.modal = ModalTypes.none
    }

    @action
    submitRequest = (): void => {
        this.root.checkoutStore.clearCart()
        this.modal = ModalTypes.none
        this.mBarType = MessageBarType.success
        this.msgBarMessage = "Thank you. Your order has been submitted."
    }

    @action
    removeParentBox = () => {
        this.clearMessage()
        this.removeFromCart(this.root.dataStore.selectedBox.BoxId)
    }

    @action
    removeFromCart = (itemKey: number) =>
        this.root.checkoutStore.items.delete(itemKey)

    @action
    removeChildFolders = () => {
        if (this.countChildFolders(this.root.dataStore.selectedBox) >= 5)
            // this.checkoutStore.addToCart(
            //     this.root.dataStore.selectedDepartment.selectedBox
            // )

            this.root.checkoutStore.cart.forEach(checkedItem => {
                if (
                    checkedItem.BoxId ===
                    this.root.dataStore.selectedDepartment.selectedBox.BoxId
                )
                    this.removeFromCart(checkedItem.FolderId)
            })
        this.clearMessage()
    }

    @action
    countChildFolders = (parentBox: IFolderOrBox): number => {
        return this.root.checkoutStore.cart.filter(
            item => item.BoxId === parentBox.BoxId
        ).length
    }
}