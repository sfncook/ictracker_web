
import java.net.URL;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Region;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import javafx.stage.Screen;
import javafx.geometry.Rectangle2D;
import javafx.collections.ListChangeListener;
import javafx.scene.Node;
import java.util.Set;
 
/**
*
* @web http://java-buddy.blogspot.com/
*/
public class Ict extends Application {
 
    private Scene scene;
    MyBrowser myBrowser;
     
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
     
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("ICT");
     
        WebView webView = new WebView();
        
        myBrowser = new MyBrowser(webView);
        myBrowser.getChildrenUnmodifiable().addListener(new ListChangeListener<Node>() {
            @Override public void onChanged(Change<? extends Node> change) {
              Set<Node> deadSeaScrolls = myBrowser.lookupAll(".scroll-bar");
              for (Node scroll : deadSeaScrolls) {
                scroll.setVisible(false);
              }
            }
          });
        
        Screen screen = Screen.getPrimary();
        Rectangle2D bounds = screen.getVisualBounds();
        scene = new Scene(myBrowser, bounds.getWidth(), bounds.getHeight());
        primaryStage.setX(0);
        primaryStage.setY(0);
        primaryStage.setWidth(bounds.getWidth());
        primaryStage.setHeight(bounds.getHeight());
        
        webView.setPrefWidth(bounds.getWidth());
        webView.setPrefHeight(bounds.getHeight()-30);
        
        primaryStage.setScene(scene);
        primaryStage.show();
        
    }
     
    class MyBrowser extends Region{
        
        final String html = "http://localhost:8888/ICT3/html/splash.html";
             
        public MyBrowser(WebView webView){
            WebEngine webEngine = webView.getEngine();
            
            //URL urlHello = getClass().getResource(html);
            //webEngine.load(urlHello.toExternalForm());
            webEngine.load(html);
         
            getChildren().add(webView);
        }
    }
}