module.exports = {
    MIDDLEWARE:{
        SUCCESS:"success_msg",
        ERROR:"error_msg",  
    },
    APP:{
        PASSWORD_SECRET:"senha123",
        MONGODB:{
            MESSAGE:{
                CONNECT:"Connected with success !",
                ERROR_CONNECT:"There was an error connecting "
            }
        },
        ERROR:{
            MESSAGE:{
                ERROR_INTERNAL:"Houve um erro interno !",
                LOAD_CLIENTS:"Houve um erro ao carregar as clientes !",
            }
        },
        SERVER_RUNNING:"Server it's running in http://localhost:"
    },
    CONFIG:{
        AUTH:{
            EMAIL: "email",
            PASSWORD: "password",
            MESSAGE:{
                EXISTING_ACCOUNT: "Essa conta não exite !",
                INVALID_PASSWORD: "Senha incorreta !"
            }
        },
        DB:{
            PRODUCTION:"production",
            MONGOURI:{
                CONNECT_CLUSTER:"mongodb://Joao:bortolosso9090@cluster0-shard-00-00-r9dfp.mongodb.net:27017,cluster0-shard-00-01-r9dfp.mongodb.net:27017,cluster0-shard-00-02-r9dfp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
                LOCALHOST:"mongodb://localhost/project_study"
            }
        }
    },
    CONTROLLERS:{
        ADMIN:{
            CATEGORY:{
                MESSAGE:{
                    SUCCESS:{
                        REGISTER:"Cliente cadastrada com sucesso !",
                        EDIT: "Cliente editada com sucesso !",
                        DELETE:"Cliente deletada com sucesso !"
                    },
                    ERROR:{
                        INVALID:{
                            NAME: "Invalid name !",
                            CLIENT: "Invalid client !",
                            ERROR_INTERNAL: "Houve um erro interno !",
                        },
                        ERROR:{
                            REGISTER:"Houve um erro ao cadastrar cliente, tente novamente !",
                            EDIT:"Houve um erro ao editar cliente !",
                            DELETE:"Houve um erro ao deletar a cliente !"
                        }
                    }
                }
            },
            POSTS:{
                MESSAGE:{
                    SUCCESS:{
                        CREATE:"Agendamento criado com sucesso !",
                        EDIT:"Agendamento editado com sucesso !",
                        DELETE:"Agendamento deletado com sucesso !"
                    },
                    ERROR:{
                        INVALID:{
                            TITTLE:"Invalid tittle !",
                            DESCRIPTION:"Invalid Description !",
                            CATEGORY:"Categoria invalida, registre outra categoria !"

                        },
                        ERROR:{
                            LIST_POSTS:"Houve um erro ao listar a postagem",
                            ERROR_INTERNAL: "Houve um erro interno !"    
                        }
                    }
                }
            }
        },
        USERS:{
            LOGIN:{
                SUCCESS_LOGOUT:"Saiu da sessão com sucesso !",
            },
            REGISTER:{
                MESSAGE:{
                    SUCCESS:{
                        CREATE_USER:"Usuario criado com sucesso !"
                    },
                    ERROR:{
                        INVALID:{
                            NAME:"Nome invalido !",
                            EMAIL:"Email invalido !",
                            PASSWORD:"Senha invalida !",
                            CONFIRM_PASSWORD:"Senha muito curta !",
                            DIFFERENT_PASSWORD:"As senhas são diferentes, tente novamente !",
                            NOTICE:{
                                EXIST_ACCOUNT:"Já exite uma conta com esse email !",
                            }
                        },
                        ERROR:{
                            ERROR_INTERNAL:"Houve um erro durante cadastramento do usuario !",
                            ERROR_CREATE:"Houve um erro ao criar um novo usuario. Tente novamente !"
                        }
                    }
                }
            }
        }
    },
    HELPERS:{
        EADMIN:{
            MESSAGE:"Você deve estar logado parar ter acesso !"
        }
    },
    MODELS:{
        CATEGORIE:{

        },
        POST:{

        },
        USUARIO:{

        }
    },
    ROUTES:{
        ADMIN:{
            CATEGORY:{

            },
            POSTS:{

            }
        },
        USERS:{
            LOGIN:{

            },
            REGISTER:{

            }
        }
    }
};