---
title: "Notifications"
description: >
  Notifications
sidebar_position: 4
---

## Configuration

If you want to receive a notification on pipeline finished, you need to add the following two keys to the Environment Variables (i.e. the `.env` file).
```shell
# .env
# notification request url, e.g.: 
NOTIFICATION_ENDPOINT=
# secret is used to calculate signature
NOTIFICATION_SECRET=
```

- `NOTIFICATION_ENDPOINT` The fully qualified URL of your notification receiver.
- `NOTIFICATION_SECRET` Used to sign the request data, allowing you to verify whether the request is sent by a legitimate sender. You can leave this empty if verification is not needed. See [Signature](#signature) for the algorithm detail.

## Notification Request

Example of request you would receive
```
POST http://example.com/lake/notify?nouce=3-FDXxIootApWxEVtz&sign=424c2f6159bd9e9828924a53f9911059433dc14328a031e91f9802f062b495d5

{
  "ProjectName": "projectName",
  "PipelineID": 39,
  "BeganAt": "2024-09-05T15:08:00.389+08:00",
  "FinishedAT": "2024-09-05T15:28:00.389+08:00",
  "Status":"TASK_COMPLETED",
  "CreatedAt":"2024-09-05T15:08:00.389+08:00",
  "UpdatedAt":"2024-09-05T15:28:00.785+08:00"
}
```

- `nonce`: A unique value to prevent replay attacks.
- `sign`: A signature for verifying the request's authenticity.


## Signature


The signature ensures that the request is sent by an authorized sender and has not been tampered with. You should verify the signature before processing the notification. The signature is calculated using the sha256 algorithm.

```go
// calculate checksum
sum := sha256.Sum256([]byte(requestBody + NOTIFICATION_SECRET + nouce))
return hex.EncodeToString(sum[:])
```
