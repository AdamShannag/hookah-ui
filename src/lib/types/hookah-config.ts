export interface Config {
    receiver: string
    auth: Auth
    event_type_in: string
    event_type_key: string
    events: Event[]
}

export interface Auth {
    flow: string
    header_secret_key?: string
    secret?: string
}

export interface Event {
    event?: string
    conditions: string[]
    hooks: Hook[]
}

export interface Hook {
    name: string
    endpoint_key: string
    body: string
}

export interface Template {
    name: string
    content: string
}