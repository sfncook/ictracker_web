
import java.io.IOException;
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
import static javafx.application.Application.launch;
import java.util.Scanner;  
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.stage.WindowEvent;

 
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
        Thread t = new Thread(new Runnable() {

            @Override
            public void run() {
                Acme.Serve.Main.main(new String[]{"-a","aliases.properties","-p","8080","-l"});
            }
        });
        t.start();
        launch(args);
    }
     
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("ICT");
     
        WebView webView = new WebView();
        
        myBrowser = new MyBrowser(webView);
        myBrowser.getChildrenUnmodifiable().addListener(new ListChangeListener<Node>() {
            @Override public void onChanged(ListChangeListener.Change<? extends Node> change) {
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
        
        primaryStage.setOnCloseRequest(new EventHandler<WindowEvent>() {
            public void handle(WindowEvent t) {
                Platform.exit();
                try {
                    Acme.Serve.Main.stop();
                } catch (IOException ex) {
                    Logger.getLogger(Ict.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
        
//        primaryStage.setOnCloseRequest(new EventHandler<WindowEvent>() {
//            public void handle(WindowEvent e){
////              ModalDialog dialog = new ModalDialog( mainStage, "Question" );
////              Button yes = new Button( "Yes" );
////              Button no  = new Button( "No" );
////              ArrayList<Button> buttons = new ArrayList<>();
////              buttons.add(yes); buttons.add(no);
////              Label msg = new Label( "Really Exit ?" );
////              Group groupInDialog = new Group();
////              groupInDialog.getChildren().add( msg );
////              dialog.setContents( groupInDialog, buttons );
////              int ans = dialog.show( 300, 300 );
////              System.out.println("returned from a modal dialog");
////              if( ans == 1 ){
////                e.consume(); // this blocks window closing
////              }
//            }
//          });
        
    }
     
    class MyBrowser extends Region{
             
        public MyBrowser(WebView webView){
            WebEngine webEngine = webView.getEngine();
            
//            final String html = "http://localhost:8888/ICT3/html/splash.html";
            String html = "http://localhost:8080/html/splash.html";
            webEngine.load(html);
            
//            URL url = Ict.class.getResource("html/splash.html");
//            if(url!=null) {
//                webEngine.load(url.toExternalForm());
//            } else {
//                System.out.println("url is NULL!");
//            }
         
            getChildren().add(webView);
        }
    }
}