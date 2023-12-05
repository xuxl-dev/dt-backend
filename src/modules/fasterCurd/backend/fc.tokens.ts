import { CRUDMethod } from "./decl/base.decl"

export const fcrud_prefix = `fcrud:`
type FcrudPrefixType = typeof fcrud_prefix
export const ENTITY_NAME_TOKEN = `${fcrud_prefix}entity-name` //TODO deprecate this
export const FIELDS_TOKEN = `${fcrud_prefix}fields` //TODO deprecate this
export const GEN_CRUD_METHOD_TOKEN = `${fcrud_prefix}gen-crud-method` //TODO deprecate this
export const IGNORE_FIEIDS_TOKEN = `${fcrud_prefix}ignore-fields` //TODO deprecate this
export const CRUD_OPTION = `${fcrud_prefix}crud-option`
export const BEFORE_ACTION_TOKEN = `${fcrud_prefix}before-action`
export type BeforeActionTokenType =
  `${FcrudPrefixType}before-action-${CRUDMethod}`
export const BEFORE_ACTION_SUM_TOKEN = `${fcrud_prefix}before-action-sum`
export const FCRUD_GEN_CFG_TOKEN = `${fcrud_prefix}fast-crud-config-gen`
