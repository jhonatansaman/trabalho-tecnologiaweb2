angular
        .module('alunosApp', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/lista', {
                        templateUrl: 'templates/lista.html',
                        controller: 'ListaAlunosController'
                    })
                    .when('/cadastro', {
                        templateUrl: 'templates/cadastro.html',
                        controller: 'CadastroAlunosController'
                    })
                    .when('/cadastro/:id', {
                        templateUrl: 'templates/cadastro.html',
                        controller: 'CadastroAlunosController'
                    })
                    .when('/Sobre',{
                        templateUrl: 'templates/Sobre.html',
                        controller: 'CadastroAlunosController'
                        
                    })
                    .otherwise({
                        redirectTo: '/Sobre'
                    });
        })
        
         
       
        .controller('ListaAlunosController', function ($scope, AlunosService) {
            
            listar();
            function listar() {
                AlunosService.listar().then(function (resposta) {
                    $scope.alunos = resposta.data;
                    });
            }
            
            function erro(){
                alert("Erro!");
            }
            
            $scope.excluir = function (aluno) {
                AlunosService.excluir(aluno).then(listar,erro);
            };
        })
        .controller('CadastroAlunosController', function ($scope, AlunosService, $location, $routeParams) {

            if($routeParams.id){
               AlunosService.getAluno($routeParams.id).then(function(resposta){
                   $scope.aluno = resposta.aluno;
               });
            
            } else{
                $scope.aluno = {};
            }
            
            
             listar();
            function listar() {
                AlunosService.listar().then(function (resposta) {
                    $scope.alunos = resposta.data;
                    //$scope.alunos = ProdutosService.listar();
                });
            }
            
            $scope.salvar = function () {
            
                AlunosService.salvar($scope.aluno).then(function(){
                     $location.path("/lista");
                 });
                 };
            

            $scope.cancelar = function () {
                $location.path("/lista");
            };
            
            
            
       
        })
        
        
        .service('AlunosService', function ($http) {
            
                this.listar = function (aluno) {
                return $http.get('http://localhost:48829/work/webresources/alunos/');
            };

            
             this.getAluno = function (id) {
                 return $http.get('http://localhost:48829/work/webresources/alunos/' + id);
             };
        
            this.excluir = function (aluno) {
                var id = aluno.id;
                return $http.delete('http://localhost:48829/work/webresources/alunos' + id);
                
            };
            
             this.salvar = function (aluno) {
                 if(aluno.id){
                     return $http.put('http://localhost:48829/work/webresources/alunos' + aluno.id, aluno);
                 }else{
                return $http.post('http://localhost:48829/work/webresources/alunos/', aluno);
            }

             };
             
        });
            




