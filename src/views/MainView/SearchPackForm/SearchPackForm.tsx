import React, {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import {Alert, Button, Col, Form, FormControl, Row} from "react-bootstrap";

import {JsonRpcsHook} from "../../../hooks/useJsonRpc";

type SearchPackFormProps = {
  /**
   * Hook for managing rpc functionality
   */
  useRpc: JsonRpcsHook
}

export const SearchPackForm: FC<SearchPackFormProps> = ({ useRpc }) => {
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
