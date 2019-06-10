from rest_framework import viewsets
from .serial import ArticleSerializer
from articles.models import Article

#class ArticleListView(ListAPIView):
#   queryset = Article.objects.all()
#   serializer_class = ArticleSerializer


#class ArticleDetailView(RetrieveAPIView):
#   queryset = Article.objects.all()
#   serializer_class = ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
     queryset = Article.objects.all()
     serializer_class = ArticleSerializer