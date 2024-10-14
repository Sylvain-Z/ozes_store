import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

import { fetchData } from "../../../assets/api";

import Loading from "../Containers/Loading/Index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

function ProductGalery() {
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);

  const [msg, setMsg] = useState("");
  const [cancelFiltersBtn, setCancelFiltersBtn] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const [cateTitle, setCateTitle] = useState(""); // pour filtre + pagination
  const [currentPage, setCurrentPage] = useState(1); // pour pagination
  const [totalPages, setTotalPages] = useState(0); // pour pagination
  
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function getProductGalery() {
      try {
        if (cancelFiltersBtn === false) {
          const products = await (
            await fetchData(`products/galery/${currentPage}`)
          );
          setProducts(products.datas);
          setTotalPages(products.totalPages[0].totalPages);
        } else {
          // --------------------------------------------------------------------------------------------------- début doublon
          // j'ai été obligé de doubler le code ci après ( même que la fonction FilterByCategory ) car :
          // La première fois que le composant est monté tout ce passe normalement, la pagination fonctionne bien.
          // Lorsque j'exécute un filtre avec FilterByCategory, la state products est bien mis à jour avec les produits filtrés.
          // Mais lorsque je clique sur le bouton nextPage, la state products  est réinitialiser au fetch précédent et donc je vois la page deux mais de la state sans le filtre
          // Sans currentPage dans le tableau des dépendences la state n'est pas réactualisé au clic sur next ou prev, mais l'affichage des produits ne maj pas.
          const products = await fetchData(`products/galerie_filtre/${cateTitle}/${currentPage}`);
          if (products) {
            setProducts(products);
            setTotalPages(products.totalPages[0].totalPages);
          } else {
            setMsg(
              "Il y a un soucis avec les filtres rechargez la page ou contactez nous si le problème persiste."
            );
          }
        } // ----------------------------------------------------------------------------------------- fin doublon
      } catch (error) {
        throw Error(error);
      }
    }
    getProductGalery();
  }, [currentPage]);

  // Affiches le noms des catégories pour les filtres --------------------------------------------------------
  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await fetchData("categories/categories");
        if (categories) {
          setCategories(categories.datas);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getCategories();
  }, [categories]);

  // Fonction des filtres --------------------------------------------------------
  async function ResetFilter() {
    const products = await fetchData("products/galery/1");
    setProducts(products.datas);
    setTotalPages(products.totalPages[0].totalPages);
    setCurrentPage(1);
    setCancelFiltersBtn(false);
    setSelectedButton(null);
  }

  async function FilterByCategory(cate_title) {
    const products = await fetchData(`products/galerie_filtre/${cate_title}/1`);
    if (products) {
      setProducts(products.datas);
      setTotalPages(products.totalPages[0].totalPages);
      setCurrentPage(1); // remet la page courante à un pour repartir du début de la liste des filtres
      setCancelFiltersBtn(true); // affiche le bouton d'annulation des filtres
      setCateTitle(cate_title); // set la state pour le fetch du useEffect
      setSelectedButton(cate_title);
    } else {
      setMsg(
        "Il y a un soucis avec les filtres rechargez la page ou contactez nous si le problème persiste."
      );
    }
  }

  // fonctions de pagination --------------------------------------------------------
  const prevPage = () => {
    if (currentPage == 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage == totalPages) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  // Affiche les boutons de pagination proprement
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "current" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="filter-ctn">
        {!categories ? (
          <>
          </>
        ) : (
          categories.map((categorie) => (
            <>
              <button
                key={categorie.id}
                className={`filter-btn ${
                  selectedButton === categorie.cate_title ? "selected" : ""
                }`}
                onClick={() => FilterByCategory(categorie.cate_title)}
              >
                {categorie.cate_title}
              </button>
            </>
          ))
        )}
        {!cancelFiltersBtn ? (
          <></>
        ) : (
          <>
            <button className="filter-btn cancel" onClick={() => ResetFilter()}>
              <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
          </>
        )}
      </div>

      {msg && <p className="form_advise_black">{msg}</p>}

      <div className="shop">
        {!products.length ? (
          <Loading />
        ) : (
          products.map((product) => (
            <div className="product_grid" key={product.id}>
              <figure>
                <Link to={`/le_store/${product.title_url}/${product.id}`}>
                  <img src={`${product.file_name}`} alt={product.caption} />
                  <figcaption>
                    <p>{product.title}</p>
                    <p>{product.price}€</p>
                  </figcaption>
                </Link>
              </figure>
            </div>
          ))
        )}
      </div>

      {totalPages === 0 ? (
        <></>
      ) : (
        <>
          <div className="pagination-ctn">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              <FontAwesomeIcon icon={faAngleLeft} size="xl" />
            </button>

            {renderPageNumbers()}

            <button
              className="pagination-btn"
              disabled={currentPage == totalPages}
              onClick={nextPage}
            >
              <FontAwesomeIcon icon={faAngleRight} size="xl" />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ProductGalery;
