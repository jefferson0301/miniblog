import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom"

//hooks
import {useAuthValue} from "../../context/AuthContext.js"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { deleteDocument, useDeleteDocument } from "../../hooks/useDeleteDocument.js"

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)

  const {deleteDocument} = useDeleteDocument("posts")

  

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard} >
        <h2>Dashboard</h2>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts} >
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn" >Criar Primeiro Post</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header} >
              <span>Titulo</span>
              <span>Imagem</span>
              <span>Ações</span>
            </div>
            
          {posts && posts.map( (post) => 
            <div key={post.id} className={styles.post_row} >
              <div className={styles.container_post} >
                <p>{post.title}</p>
                <img src={post.image} alt={post.title} />
              </div>
              
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline" >
                  Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline" >
                  Editar
                </Link>
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger"  >
                  Excluir
                </button>
              </div>
            </div>
           )}
          </> 
        )}

    </div>
  )
}

export default Dashboard