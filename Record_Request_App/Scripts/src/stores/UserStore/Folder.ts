import { ItemStatusTypes } from "../../models"
import { action, computed } from "mobx"
import { Box } from "."
import { RootStore } from "../RootStore"
import { CheckoutStore } from "../CheckoutStore"
import { IObjectWithKey } from "office-ui-fabric-react"
import { messages } from "../UIStore"

export interface IFolder {
    BoxId?: number
    FolderId?: number | string
    DeptId?: number
    BoxDescription?: string
    FolderDescription: string
    CurrentFolderLocation: string
    LastCheckoutDate?: string
    PCODate?: string
    DateCreated?: string
}

export interface IFolderForm {
    FolderDescription: string
}
export class Folder implements IFolder, IObjectWithKey {
    constructor(private _box: Box, _folder: IFolder, private _root: RootStore) {
        Object.assign(this, _folder)
        this.key = _folder.FolderId
        this.checkoutStore = this._root.checkoutStore
    }
    DeptId?: number
    LastCheckoutDate?: string
    BoxDescription?: string
    FolderId: number
    BoxId: number
    FolderDescription: string = "No description available"
    CurrentFolderLocation: string = ""
    PCODate?: string
    DateCreated?: string
    checkoutStore: CheckoutStore
    key

    @computed
    get addable(): boolean {
        return !this.folderInCart && this.folderIsAvailable
    }

    @computed
    get status(): ItemStatusTypes {
        return this._box.status !== ItemStatusTypes.available
            ? this._box.status
            : this.folderInCart
                ? ItemStatusTypes.inCheckout
                : this.CurrentFolderLocation === String(this.BoxId)
                    ? this._box.status
                    : this.CurrentFolderLocation.toLowerCase().startsWith("l")
                        ? ItemStatusTypes.unavailable
                        : ItemStatusTypes.checkedOutByClient
    }

    @computed
    get siblingFoldersInCart(): Array<Folder> {
        return this.checkoutStore.folders.filter(_item => {
            return _item.BoxId === this.BoxId
        })
    }

    @computed
    get fiveOrMoreSiblingFolders(): boolean {
        return this.siblingFoldersInCart.length > 4
    }

    /* Addable Condtions */

    @computed
    get folderInCart(): boolean {
        return (
            this.checkoutStore.items.has(this.FolderId) || this._box.boxInCart
        )
    }

    @computed
    get folderIsAvailable(): boolean {
        return (
            this._box.boxIsAvailable &&
            this.status === ItemStatusTypes.available
        )
    }

    @action
    select = () => {
        this._box.selectedFolder = this
    }

    @action
    request = () => {
        this.checkoutStore.items.set(this.FolderId, this)
        this.fiveOrMoreMiddleware()
    }

    @action
    fiveOrMoreMiddleware = () => {
        this.fiveOrMoreSiblingFolders
            ? (this._root.uiStore.message = messages.Five_Folders)
            : this._root.uiStore.clearMessage()
    }

    @action
    remove = () => {
        this.checkoutStore.items.delete(this.FolderId)
        this.fiveOrMoreMiddleware()
    }
}
