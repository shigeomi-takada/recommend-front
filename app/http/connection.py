# coding: utf-8

from flask import jsonify, abort


class Connection():
    '''
    アプリケーションの稼働を確認するためのヘルスチェックエンドポイント
    @return json
    '''

    def get_ping(self):
        return jsonify({'ping': 'pong'})
