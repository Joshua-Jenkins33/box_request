import { action, observable, runInAction } from "mobx"
import { IDataService } from "../../services"
import { UIStore, CheckoutStore, IUser, User } from ".."
import { FormTypes } from "../../models"

export class RootStore {
    uiStore: UIStore
    checkoutStore: CheckoutStore
    userInfo: IUser
    userStore: User
    dataService: IDataService
    constructor(_dataService: IDataService) {
        this.dataService = _dataService
    }

    @observable
    public initialized: boolean = false

    @action
    async init(): Promise<void> {
        this.userInfo = await this.dataService.fetchUser()
        if (!this.initialized) {
            this.checkoutStore = new CheckoutStore(this)
            this.userStore = new User(this)
            this.uiStore = new UIStore(this)
            await this.uiStore.init()
            await this.userStore.init().then(() => {
                this.userStore.departments[0].select()

                // this.uiStore.form = FormTypes.NEW_FOLDER
            })

            runInAction(() => (this.initialized = true))
        }
    }
}
