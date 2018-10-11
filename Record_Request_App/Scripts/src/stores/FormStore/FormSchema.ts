import { JSONSchema6 } from "json-schema"

import { UiSchema, IChangeEvent, Field, Widget } from "react-jsonschema-form"

import { UserStore, IFolderForm } from ".."
import { FormUtils } from "./FormUtils"

export interface IFields {
    [name: string]: Field
}

export interface IFormConfig {
    schema: JSONSchema6
    uiSchema?: UiSchema
    fields?: IFields
    submit: (e: IChangeEvent<{}>, user: UserStore) => void
}
export interface IForms {
    NEW_FOLDER: IFormConfig
    NEW_BOX: IFormConfig
    SUBMIT_CART: IFormConfig
}

export const FORMS: IForms = {
    NEW_FOLDER: {
        schema: {
            type: "object",
            title: "Folder Form",
            required: ["FolderDescription"],
            properties: {
                FolderDescription: {
                    type: "string",
                    maxLength: 50,
                    title: "Folder Description",
                },
            },
            description: "Describes the contents of the folder.",
        },
        uiSchema: {
            FolderDescription: {
                "ui:autofocus": true,
            },
        },
        submit: (e, user) =>
            user.selectedDepartment.selectedBox.createFolder(
                e.formData as IFolderForm
            ),
    },
    NEW_BOX: {
        schema: {
            type: "object",
            title: "Box Form",
            required: ["BoxDescription"],
            properties: {
                BoxDescription: {
                    type: "string",
                    maxLength: 5,
                    title: "Box Description",
                },
            },
        },
        uiSchema: {},
        fields: {},
        submit: FormUtils.logOnSubmit,
    },
    SUBMIT_CART: {
        schema: {
            type: "object",
            title: "Request Form",
            required: ["DeliveryInstructions"],
            properties: {
                DeliveryInstructions: {
                    type: "string",
                    title: "Delivery Instructions",
                },
                urgent: {
                    type: "boolean",
                    title: "This Request is Urgent",
                    default: false,
                },
                permanent: {
                    type: "boolean",
                    title: "This Request is Permanent",
                    default: false,
                },
            },
        },
        uiSchema: {
            DeliveryInstructions: {
                "ui:autofocus": true,
                "ui:widget": "textarea",
            },
        },
        fields: {},
        submit: FormUtils.logOnSubmit,
    },
}
