# coding: utf-8
import os
import redis
import msgpack
from app import app
from app.http.response import Response


class Search():

    def _decode_bytes(self, item):
        '''
        bytes型のkey, valを全てstr型に変換
        list()
        :return <map object at xxx>
            返り値はlist()で変換して使えば良い
        '''
        return {
            key.decode(): val.decode()
                if isinstance(val, bytes) else val
                    for key, val in item.items()
        }

    def get_vocabulary(self, upload_id):
        host = os.getenv('REDIS_SLAVE_HOSTNAME')
        password = os.getenv('REDIS_SLAVE_PASSWORD')
        port = os.getenv('REDIS_SLAVE_PORT', 6379)
        db = os.getenv('REDIS_SLAVE_DB')
        r = redis.StrictRedis(
            host=host,
            password=password,
            port=port,
            db=db,
            decode_responses=False,
            socket_timeout=60)

        item = r.get('ds:uploads:{0}'.format(upload_id))
        return self._decode_bytes(msgpack.unpackb(item))
