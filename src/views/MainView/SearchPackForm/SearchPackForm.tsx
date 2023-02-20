import React, {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import {Alert, Button, Col, Form, FormControl, Row} from "react-bootstrap";

import {JsonRpcsHook} from "../../../hooks/useJsonRpc";
import {AtomicApiHook} from "../../../hooks/useAtomicApi";

type SearchPackFormProps = {
  /**
   * Hook for managing rpc functionality
   */
  useRpc: JsonRpcsHook
  /**
   * Hook for managing atomic API functionality
   */
  atomicApi: AtomicApiHook
}

export const SearchPackForm: FC<SearchPackFormProps> = ({ useRpc, atomicApi }) => {
  const [value, setValue] = useState('')

  const find = (e: SyntheticEvent) => {
    e.preventDefault()
    useRpc.getPackRolls(value)
  }
  const pending = useRpc.gettingPackRolls
  const error = useRpc.gettingPackRollsError

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (useRpc.packRolls.length > 0) {
      useRpc.resetPackRolls()
    }
    if (atomicApi.templates.length > 0) {
      atomicApi.resetTemplates()
    }
    if (error) {
      useRpc.resetError()
    }
    setValue(e.target.value)
  }

  return <Form onSubmit={find}>
    <Row>
      <Col xs={3}>
        <FormControl value={value} onChange={onChange} className='mb-2 row-4' />
      </Col>
      <Col>
        <Button disabled={pending} type='submit'>Find!</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        {error && <Alert variant='danger'>{error}</Alert>}
      </Col>
    </Row>
  </Form>
}
