import React, {FC} from "react";

import {AtomicTemplate} from "../../types/atomicApiTypes";
import {PackRolls} from "../../hooks/useJsonRpc";
import {getOddForOneTemplate} from "../../services/odds";

import './Template.scss'

/**
 * Returns the link of the template on AtomicHub
 * @param template Template the link is generated for
 */
const getTemplateLinkOnAtomicHub = (template: AtomicTemplate) =>
  `https://wax.atomichub.io/explorer/template/wax-mainnet/${template.collection.collection_name}/${template.template_id}`

/**
 * Returns the ipfs link to the template
 * @param template Template the image link is generated for
 */
const getImageLinkToTemplate = (template: AtomicTemplate) => {
  return `https://ipfs.io/ipfs/${template.immutable_data.img}`
}

type TemplateProps = {
  template: AtomicTemplate
  packRolls: PackRolls
}

export const Template: FC<TemplateProps> = ({ template, packRolls }) => {

  return (
    <div className='template'>
      <img src={getImageLinkToTemplate(template)} className='template__media' alt="template" />
      <div>{template.immutable_data.name}</div>
      <div>Level: {template.immutable_data.level}</div>
      <div>Template ID: <a href={getTemplateLinkOnAtomicHub(template)} rel="noreferrer" target='_blank'>{template.template_id}</a></div>
      <div>Odd: {getOddForOneTemplate(template, packRolls)}%</div>
    </div>
  )
}
