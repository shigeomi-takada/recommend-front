# coding: utf-8

from flask import request, abort

from app import app
from app.http.response import Response


class Recommend():
    '''
    queryパラメータ、bodyパラメータは、validationクラスによってチェックが済んでいる
    ものとする。なので、当クラス内でパラメータチェックは行わない。
    '''

    def get(self):
        '''

        '''

        items = {}
        items['lancers'] = []

        for i in range(12):
            items['lancers'].append({
                'id': i,
                'message': 'message: {}'.format(i),
                'title': 'title: {}'.format(i),
            })


        return Response().parse(items)
