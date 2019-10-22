import 'source-map-support/register';
import { api } from '@manwaring/lambda-wrapper';
import { Message } from './message';
import { messagesTable } from './table';

/**
 * @swagger
 * /messages:
 *  post:
 *    summary: Save message
 *    description: Creates and returns a new message
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/CreateMessageRequest'
 *    responses:
 *      200:
 *        description: The newly created message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/MessageResponse'
 */
export const handler = api(async ({ body, testRequest, success, error }) => {
  try {
    const message = new Message(body, testRequest);
    await messagesTable.add(message);
    success(message);
  } catch (err) {
    error(err);
  }
});
